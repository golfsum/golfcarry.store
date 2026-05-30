'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { PlusIcon, MinusIcon } from './icons';

export type AccordionItem = {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(
    items.findIndex((i) => i.defaultOpen) === -1
      ? null
      : items.findIndex((i) => i.defaultOpen),
  );

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="text-sm font-semibold">{item.title}</span>
              {isOpen ? (
                <MinusIcon className="h-4 w-4 shrink-0 text-ink-muted" />
              ) : (
                <PlusIcon className="h-4 w-4 shrink-0 text-ink-muted" />
              )}
            </button>
            <div
              className={clsx(
                'grid overflow-hidden transition-all duration-200',
                isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]',
              )}
            >
              <div className="min-h-0 text-sm leading-relaxed text-ink-soft">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
