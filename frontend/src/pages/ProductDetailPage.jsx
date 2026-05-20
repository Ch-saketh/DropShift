import { useState } from "react";
import { ShoppingBag, Heart, Eye } from "lucide-react";

export default function ProductCard({ product, onAddToBag }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    setAdded(true);
    onAddToBag?.(product);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="group relative flex flex-col bg-white overflow-hidden border border-slate-100 hover:border-[#0b2240] transition-colors duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#0b2240 1px,transparent 1px),linear-gradient(90deg,#0b2240 1px,transparent 1px)",
            backgroundSize: "2rem 2rem",
          }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#ff5700] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-[#0b2240] text-white text-[10px] font-black px-2 py-1">
            -{discount}%
          </span>
        )}
        <div className="absolute bottom-0 inset-x-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-3 font-black uppercase text-xs tracking-widest transition-colors duration-200 ${
              added ? "bg-[#0b2240] text-white" : "bg-[#ff5700] hover:bg-[#e04e00] text-white"
            }`}
          >
            <ShoppingBag size={14} strokeWidth={2.5} />
            {added ? "Added!" : "Add to Bag"}
          </button>
          <button className="w-12 flex items-center justify-center bg-white border-l border-slate-200 text-[#0b2240] hover:bg-slate-50 transition-colors">
            <Eye size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">
          {product.brand}
        </span>
        <h3 className="text-sm font-extrabold uppercase text-[#0b2240] leading-tight tracking-tight line-clamp-2">
          {product.name}
        </h3>
        {product.sizes?.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {product.sizes.map((s) => (
              <span key={s} className="text-[9px] font-bold border border-slate-300 px-1.5 py-0.5 text-slate-500 uppercase">
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-black text-[#0b2240]">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      <button
        aria-label="Toggle wishlist"
        onClick={() => setWished((w) => !w)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
        style={{ display: discount ? "none" : undefined }}
      >
        <Heart
          size={14}
          strokeWidth={2.5}
          className={wished ? "fill-[#ff5700] text-[#ff5700]" : "text-[#0b2240]"}
        />
      </button>
    </article>
  );
}