'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { SearchIcon } from '@/components/icons';

export function SearchBox({
  className = '',
  autoFocus = false,
  onSubmitted,
}: {
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Prefill from the URL's ?q= without useSearchParams (avoids forcing a
  // Suspense boundary on every page that renders the header).
  useEffect(() => {
    if (typeof window === 'undefined' || !inputRef.current) return;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) inputRef.current.value = q;
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    onSubmitted?.();
  }

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`} role="search">
      <input
        ref={inputRef}
        name="q"
        type="search"
        autoFocus={autoFocus}
        placeholder="Search golf gear…"
        aria-label="Search products"
        className="input h-10 rounded-full pl-10 pr-4 text-sm"
      />
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
    </form>
  );
}
