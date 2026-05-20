// src/components/ProductCard.jsx
import { useState } from "react";
import { ShoppingBag, Eye } from "lucide-react";

/**
 * ProductCard
 * Props:
 *  - product    : object { id, name, brand, price, originalPrice, image, badge, sizes }
 *  - onAddToBag : (product) => void
 *  - onViewProduct : (product) => void (optional, for detail page navigation)
 */
export default function ProductCard({ product, onAddToBag, onViewProduct }) {
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    onAddToBag?.(product);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleView = () => {
    onViewProduct?.(product);
  };

  return (
    <article
      onClick={handleView}
      className="group relative flex flex-col bg-white overflow-hidden border border-slate-100 hover:border-[#0b2240] transition-colors duration-300 cursor-pointer"
    >
      {/* ── Image container ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />

        {/* Grid overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#0b2240 1px,transparent 1px),linear-gradient(90deg,#0b2240 1px,transparent 1px)",
            backgroundSize: "2rem 2rem",
          }}
        />

        {/* Badge (New Drop / Sale) */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#ff5700] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 z-10">
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 right-3 bg-[#0b2240] text-white text-[10px] font-black px-2 py-1 z-10">
            -{discount}%
          </span>
        )}

        {/* ── Hover action buttons (slide up from bottom) ── */}
        <div className="absolute bottom-0 inset-x-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-3 font-black uppercase text-xs tracking-widest transition-colors duration-200 ${
              added
                ? "bg-[#0b2240] text-white"
                : "bg-[#ff5700] hover:bg-[#e04e00] text-white"
            }`}
          >
            <ShoppingBag size={14} strokeWidth={2.5} />
            {added ? "Added!" : "Add to Bag"}
          </button>
          <button
            onClick={handleView}
            className="w-12 flex items-center justify-center bg-white border-l border-slate-200 text-[#0b2240] hover:bg-slate-50 transition-colors"
          >
            <Eye size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Product info ── */}
      <div className="p-4 flex flex-col gap-1">
        {/* Brand */}
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">
          {product.brand}
        </span>

        {/* Name */}
        <h3 className="text-sm font-extrabold uppercase text-[#0b2240] leading-tight tracking-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Size pills */}
        {product.sizes?.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {product.sizes.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-[9px] font-bold border border-slate-300 px-1.5 py-0.5 text-slate-500 uppercase"
              >
                {s}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[9px] font-bold text-slate-400 px-1.5 py-0.5">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-black text-[#0b2240]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}