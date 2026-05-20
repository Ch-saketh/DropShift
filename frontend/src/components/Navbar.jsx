// src/components/Navbar.jsx
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

/**
 * Navbar
 * Props:
 *  - cartCount    : number   — badge count on the bag icon
 *  - onLogoClick  : ()=>void — navigate home
 *  - onShopClick  : ()=>void — navigate to shop
 *  - onCartClick  : ()=>void — navigate to cart
 *  - currentPage  : string   — "home"|"shop"|"product"|"cart"|"checkout"
 */
export default function Navbar({
  cartCount = 0,
  onLogoClick,
  onShopClick,
  onCartClick,
  currentPage,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Pricing",       handler: onShopClick  },
    { label: "Shop",          handler: onShopClick  },
    { label: "About Us",      handler: onLogoClick  },
    { label: "Case Studies",  handler: onLogoClick  },
    { label: "FAQs",          handler: onLogoClick  },
  ];

  const isShopActive = ["shop", "product"].includes(currentPage);
  const isCartActive = currentPage === "cart";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <button
          onClick={onLogoClick}
          className="flex flex-col leading-none text-left group"
        >
          <span className="text-xl font-black tracking-tight text-[#ff5700] group-hover:text-[#e04e00] transition-colors">
            Drop
            <span className="text-[#0b2240] group-hover:text-[#ff5700] transition-colors">
              Shift
            </span>
          </span>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Fashion Drop
          </span>
        </button>

        {/* ── Desktop nav links ──────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, handler }) => {
            const active =
              label === "Shop" ? isShopActive : false;
            return (
              <button
                key={label}
                onClick={handler}
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-150 relative group
                  ${active ? "text-[#ff5700]" : "text-slate-500 hover:text-[#0b2240]"}`}
              >
                {label}
                {/* Underline indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#ff5700] transition-all duration-200
                    ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </button>
            );
          })}
        </nav>

        {/* ── Right actions ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">

          {/* Cart button */}
          <button
            onClick={onCartClick}
            className={`relative flex items-center justify-center w-10 h-10 transition-colors duration-150
              ${isCartActive ? "text-[#ff5700]" : "text-[#0b2240] hover:text-[#ff5700]"}`}
            aria-label={`Cart (${cartCount} items)`}
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#ff5700] text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Start project CTA — desktop only */}
          <button
            onClick={onShopClick}
            className="hidden md:flex items-center bg-[#0b2240] hover:bg-[#0a1e38] text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 transition-colors duration-150"
          >
            Start Shopping
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-[#0b2240]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-5 flex flex-col gap-1">
          {navLinks.map(({ label, handler }) => (
            <button
              key={label}
              onClick={() => { handler?.(); setMobileOpen(false); }}
              className="text-left text-xs font-black uppercase tracking-widest text-slate-600 hover:text-[#ff5700] py-2.5 border-b border-slate-50 last:border-0 transition-colors"
            >
              {label}
            </button>
          ))}

          {/* Mobile CTA */}
          <button
            onClick={() => { onShopClick?.(); setMobileOpen(false); }}
            className="mt-3 w-full bg-[#0b2240] text-white text-xs font-black uppercase tracking-widest py-3 hover:bg-[#ff5700] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}
    </header>
  );
}