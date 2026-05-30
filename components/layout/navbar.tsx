'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Logo } from '@/components/logo';
import { SearchBox } from './search-box';
import { CartButton } from '@/components/cart/cart-button';
import {
  ChevronDown,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from '@/components/icons';
import { MAIN_NAV, MEGA_MENU } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow',
        scrolled ? 'shadow-[0_1px_0_rgba(20,24,26,0.08),0_8px_20px_-16px_rgba(20,24,26,0.3)]' : 'border-b border-ink/5',
      )}
    >
      <nav className="container-page flex h-16 items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="tap -ml-2 flex items-center justify-center rounded-full p-2 lg:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        <Logo className="lg:mr-2" />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <MegaMenu />
          {MAIN_NAV.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-sand-50 hover:text-fairway-700"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-sand-50 hover:text-fairway-700"
          >
            About
          </Link>
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden w-56 xl:block">
            <SearchBox />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            aria-label="Search"
            className="tap flex items-center justify-center rounded-full p-2 hover:bg-sand-50 xl:hidden"
          >
            <SearchIcon className="h-6 w-6" />
          </button>
          <CartButton />
        </div>
      </nav>

      {/* Collapsible search (tablet/mobile) */}
      {searchOpen && (
        <div className="border-t border-ink/5 px-4 py-3 xl:hidden">
          <SearchBox autoFocus onSubmitted={() => setSearchOpen(false)} />
        </div>
      )}

      {/* Mobile drawer */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MegaMenu() {
  const group = MEGA_MENU[0];
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-ink hover:bg-sand-50 hover:text-fairway-700">
        {group.title}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="w-[34rem] rounded-card border border-ink/10 bg-white p-5 shadow-card-hover">
          <div className="grid grid-cols-2 gap-1">
            {group.children.map((child) => (
              <Link
                key={child.path}
                href={child.path}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-sand-50 hover:text-fairway-700"
              >
                {child.title}
              </Link>
            ))}
          </div>
          <Link
            href="/collections/all"
            className="mt-3 block border-t border-ink/10 px-3 pt-3 text-sm font-semibold text-fairway-700"
          >
            Shop all products →
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={clsx(
          'fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        className={clsx(
          'fixed left-0 top-0 z-50 h-full w-[85%] max-w-xs overflow-y-auto bg-white shadow-2xl transition-transform duration-300 lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="tap rounded-full p-1.5 hover:bg-sand-50"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-4 py-4">
          <SearchBox onSubmitted={onClose} />
        </div>
        <nav className="px-2 pb-8">
          <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Shop by category
          </p>
          {MEGA_MENU[0].children.map((c) => (
            <Link
              key={c.path}
              href={c.path}
              onClick={onClose}
              className="block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-sand-50"
            >
              {c.title}
            </Link>
          ))}
          <div className="my-3 border-t border-ink/10" />
          {[...MAIN_NAV, { title: 'About Us', path: '/about' }, { title: 'Contact', path: '/contact' }, { title: 'Track Order', path: '/track-order' }, { title: 'FAQ', path: '/faq' }].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className="block rounded-lg px-3 py-2.5 text-base font-medium hover:bg-sand-50"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
