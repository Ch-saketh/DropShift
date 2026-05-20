// src/Home/Home.jsx
import { useState } from "react";
import { ArrowRight, Zap, RefreshCcw, Truck, Star } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";

// ─── Featured products ────────────────────────────────────────────────────────
const FEATURED = [
  {
    id: 1,
    name: "Oversized Cargo Blazer",
    brand: "Nocturne",
    price: 89,
    originalPrice: 139,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    badge: "New Drop",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 2,
    name: "Asymmetric Linen Trench",
    brand: "Voidwear",
    price: 124,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    badge: null,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Structured Boxy Tee",
    brand: "Nocturne",
    price: 38,
    originalPrice: 55,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    badge: "Sale",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Wide-Leg Utility Pant",
    brand: "Axle Studio",
    price: 97,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b3785?w=600&q=80",
    badge: null,
    sizes: ["S", "M", "L"],
  },
];

// ─── Marquee ticker items ─────────────────────────────────────────────────────
const TICKER = [
  "No Contracts",
  "No Retainers",
  "Free Shipping Over $150",
  "30-Day Returns",
  "New Drops Weekly",
  "4.9★ Rated",
];

// ─── Perks ────────────────────────────────────────────────────────────────────
const PERKS = [
  {
    icon: <Zap size={20} strokeWidth={2.5} />,
    title: "Fast Dispatch",
    body: "Orders processed same-day before 2 PM. No delays, no excuses.",
  },
  {
    icon: <Truck size={20} strokeWidth={2.5} />,
    title: "Free Shipping",
    body: "On all orders over $150. Tracked from warehouse to your door.",
  },
  {
    icon: <RefreshCcw size={20} strokeWidth={2.5} />,
    title: "Easy Returns",
    body: "Hassle-free 30-day return window. No questions asked.",
  },
];

// ─── Reviews ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Maya R.",
    handle: "@mayastyle",
    stars: 5,
    text: "Finally a drop store that actually delivers on quality. The cargo blazer is insane.",
  },
  {
    name: "Jordan T.",
    handle: "@jtfits",
    stars: 5,
    text: "No subscription, no BS — ordered Monday, wore it Thursday. That's the vibe.",
  },
  {
    name: "Priya K.",
    handle: "@priyaedits",
    stars: 5,
    text: "The wide-leg pants are worth every penny. Sizing is spot-on too.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function Home({ onShopNow, onViewProduct }) {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToBag = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...product, qty: 1, size: product.sizes?.[1] ?? "M" }];
    });
  };

  return (
    <div className="bg-white">

      {/* ── Scrolling ticker / marquee ───────────────────────────────────── */}
      <div className="bg-[#3b82f6] overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8 text-[10px] font-black uppercase tracking-[0.25em] text-white"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured drops ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3b82f6] mb-2">
              This Week
            </p>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-[#0b2240]">
              Featured<br />
              <span className="text-[#ff5700]">Drops.</span>
            </h2>
          </div>
          <button
            onClick={onShopNow}
            className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0b2240] hover:text-[#ff5700] transition-colors group"
          >
            View All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURED.map((p) => (
            <ProductCard key={p.id} product={p} onAddToBag={handleAddToBag} />
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={onShopNow}
            className="flex items-center gap-2 bg-[#0b2240] text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-[#ff5700] transition-colors"
          >
            View All Drops
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ── Split promo banner ───────────────────────────────────────────── */}
      <section
        className="relative bg-[#0b2240] py-20 px-6 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      >
        {/* Accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 bg-[#ff5700]" />

        {/* Geometric shapes */}
        <div className="absolute right-20 top-1/2 -translate-y-1/2 w-48 h-48 border border-[#3b82f6]/20 rotate-12 hidden lg:block" />
        <div className="absolute right-32 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#ff5700]/10 -rotate-6 hidden lg:block" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3b82f6] mb-3">
              The DropShift Promise
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.88] tracking-tighter text-white">
              No Fluff.<br />
              Just<br />
              <span className="text-[#ff5700]">Fits.</span>
            </h2>
            <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
              Tired of agencies and stores that over-promise? DropShift delivers curated,
              high-quality fashion drops — no subscription, no minimum order, no headache.
            </p>
          </div>

          <button
            onClick={onShopNow}
            className="flex-shrink-0 flex items-center gap-3 bg-[#ff5700] hover:bg-[#e04e00] text-white text-sm font-black uppercase tracking-widest px-10 py-5 transition-colors group"
          >
            Shop the Drop
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ── Perks / Why us ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3b82f6] mb-3">
          Why DropShift
        </p>
        <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter text-[#0b2240] mb-12">
          Built Different.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERKS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="border border-slate-100 p-8 hover:border-[#0b2240] transition-colors duration-300 group"
            >
              <div className="w-10 h-10 bg-[#0b2240] group-hover:bg-[#ff5700] flex items-center justify-center text-white mb-6 transition-colors duration-300">
                {icon}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-[#0b2240] mb-2">
                {title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Social proof / reviews ───────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#3b82f6] mb-2">
                Social Proof
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter text-[#0b2240]">
                They Said It.<br />
                <span className="text-[#ff5700]">Not Us.</span>
              </h2>
            </div>
            <div className="hidden md:flex flex-col items-end">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#ff5700] text-[#ff5700]" />
                ))}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                4.9 / 5 · 600+ reviews
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map(({ name, handle, stars, text }) => (
              <div key={name} className="bg-white border border-slate-100 p-6 hover:border-[#0b2240] transition-colors duration-300">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#ff5700] text-[#ff5700]" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-2 border-t border-slate-50 pt-4">
                  <div className="w-7 h-7 rounded-full bg-[#0b2240] flex items-center justify-center text-white text-[9px] font-black">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#0b2240]">{name}</p>
                    <p className="text-[9px] text-slate-400">{handle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA band ───────────────────────────────────────────────── */}
      <section className="bg-[#ff5700] py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white">
            Ready to<br />Drop In?
          </h2>
          <button
            onClick={onShopNow}
            className="flex-shrink-0 flex items-center gap-3 bg-white text-[#ff5700] hover:bg-[#0b2240] hover:text-white text-sm font-black uppercase tracking-widest px-10 py-5 transition-colors group"
          >
            Browse the Store
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
}