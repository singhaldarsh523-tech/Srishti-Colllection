import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartCount, wishlistCount, onOpenCart }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bagBump, setBagBump] = useState(false);

  useEffect(() => {
    if (cartCount === 0) return;
    setBagBump(true);
    const timer = setTimeout(() => setBagBump(false), 300);
    return () => clearTimeout(timer);
  }, [cartCount]);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    {
      label: wishlistCount > 0 ? `Wishlist (${wishlistCount})` : 'Wishlist',
      href: '#wishlist',
    },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8C1D2D] focus-visible:outline-offset-4"
        >
          Srishti Collection
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative hover:text-[#1C1917] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 tabular-nums"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#8C1D2D] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (Shopping Bag) + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#8C1D2D] hover:bg-[#701522] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
              bagBump ? 'animate-bag-bump' : ''
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#1C1917] border border-[#E5E0D8] rounded-md hover:bg-[#F3F1EC] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden animate-fade-up border-t border-[#E5E0D8] bg-[#FAF9F6] px-4 py-4 flex flex-col gap-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#1C1917] py-2 border-b border-[#E5E0D8]/60 last:border-b-0 tabular-nums"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
