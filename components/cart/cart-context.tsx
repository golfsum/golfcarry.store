'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type CartLine = {
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  image: { url: string; altText: string };
  price: { amount: string; currencyCode: string };
  quantity: number;
  options: { name: string; value: string }[];
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: { amount: string; currencyCode: string };
  addItem: (line: Omit<CartLine, 'quantity'>, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = 'golfcarry-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration so we don't clobber stored data).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable */
    }
  }, [lines, hydrated]);

  const addItem = useCallback(
    (line: Omit<CartLine, 'quantity'>, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find((l) => l.variantId === line.variantId);
        if (existing) {
          return prev.map((l) =>
            l.variantId === line.variantId
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        }
        return [...prev, { ...line, quantity }];
      });
      setIsOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l)),
    );
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartState>(() => {
    const totalQuantity = lines.reduce((sum, l) => sum + l.quantity, 0);
    const amount = lines.reduce(
      (sum, l) => sum + Number(l.price.amount) * l.quantity,
      0,
    );
    const currencyCode = lines[0]?.price.currencyCode || 'USD';
    return {
      lines,
      isOpen,
      totalQuantity,
      subtotal: { amount: amount.toFixed(2), currencyCode },
      addItem,
      updateQuantity,
      removeItem,
      clear,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [lines, isOpen, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
