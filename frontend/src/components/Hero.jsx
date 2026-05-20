// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";

/**
 * Hero
 * Props:
 *  - onShopNow : () => void — fires when CTA is clicked
 */
export default function Hero({ onShopNow }) {
  const [mounted, setMounted] = useState(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative bg-white overflow-hidden min-h-[88vh] flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(11,34,64,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(11,34,64,.045) 1px, transparent 1px)",
        backgroundSize: "4rem 4rem",
      }}
    >
      {/* ── Decorative blobs ─────────────────────────────────────────────── */}
      {/* Blue arc — top left (matches reference) */}
      <div className="absolute -left-10 top-0 w-28 h-72 rounded-full border-[6px] border-[#3b82f6] opacity-70 pointer-events-none" />

      {/* Orange square accent */}
      <div className="absolute right-[42%] top-16 w-16 h-16 bg-[#ff5700] opacity-80 rotate-6 pointer-events-none hidden md:block" />

      {/* Blue circle outline */}
      <div className="absolute right-16 top-1/3 w-20 h-20 rounded-full border-4 border-[#3b82f6] opacity-30 pointer-events-none hidden lg:block" />

      {/* Orange triangle (CSS clip-path) */}
      <div
        className="absolute right-[38%] bottom-32 w-10 h-10 bg-[#ff5700] opacity-60 pointer-events-none hidden md:block"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />

      {/* Green lightning bolt accent (bottom right, matches reference) */}
      <div
        className="absolute bottom-24 right-8 w-8 h-14 bg-[#22c55e] opacity-70 pointer-events-none hidden lg:block"
        style={{ clipPath: "polygon(60% 0%,100% 0%,40% 50%,80% 50%,0% 100%,30% 50%,0% 50%)" }}
      />

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

        {/* ══ LEFT — Copy ══════════════════════════════════════════════════ */}
        <div className="flex flex-col">

          {/* Eyebrow */}
          <div
            className={`flex items-center gap-2 mb-6 transition-all duration-700
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="w-6 h-px bg-[#ff5700]" />
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#ff5700]">
              Season 2026 · Now Live
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-[clamp(3.5rem,9vw,7rem)] font-black uppercase leading-[0.88] tracking-tighter text-[#0b2240] transition-all duration-700
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "80ms" }}
          >
            No<br />
            <span className="text-[#3b82f6]">Contracts.</span><br />
            No<br />
            <span
              className="relative inline-block"
              style={{
                WebkitTextStroke: "2px #0b2240",
                color: "transparent",
              }}
            >
              Retainers.
            </span><br />
            No BS.
          </h1>

          {/* Body copy */}
          <p
            className={`mt-6 text-slate-500 text-sm leading-relaxed max-w-md transition-all duration-700
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "180ms" }}
          >
            Tired of endless contracts and agencies that talk big but deliver small?
            DropShift is your fast-track solution to eCommerce fashion — without the
            commitment, fluff, or headache.
          </p>

          {/* CTA row */}
          <div
            className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "260ms" }}
          >
            <button
              onClick={onShopNow}
              className="flex items-center gap-2.5 bg-[#ff5700] hover:bg-[#e04e00] text-white text-xs font-black uppercase tracking-widest px-8 py-4 transition-colors group"
            >
              Free Consultation
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 bg-[#facc15] rounded-sm">
                <Star size={12} className="fill-white text-white" />
              </div>
              <span className="text-xs font-bold text-slate-500">
                Rated <span className="font-black text-[#0b2240]">4.9/5</span> from over 600 reviews.
              </span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT — Hero image block ══════════════════════════════════ */}
        <div
          className={`relative flex justify-center lg:justify-end transition-all duration-1000
            ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          style={{ transitionDelay: "120ms" }}
        >
          {/* Image frame */}
          <div className="relative w-full max-w-md">

            {/* Coloured tint overlay (grayscale-to-colour effect) */}
            <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85"
                alt="Fashion model"
                className="w-full h-full object-cover object-top grayscale"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
              />

              {/* Orange warm tint on right half */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 45%, rgba(255,87,0,0.22) 100%)",
                }}
              />

              {/* Green tint bottom right */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(34,197,94,0.18) 0%, transparent 40%)",
                }}
              />
            </div>

            {/* Floating stat card — top right */}
            <div className="absolute -top-4 -right-4 bg-[#0b2240] text-white px-4 py-3 shadow-xl hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#3b82f6]">This Week</p>
              <p className="text-lg font-black leading-tight">600+</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">Orders Shipped</p>
            </div>

            {/* Floating badge — bottom left */}
            <div className="absolute -bottom-4 -left-4 bg-[#ff5700] text-white px-4 py-3 shadow-xl hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Rated</p>
              <p className="text-lg font-black leading-tight">4.9 ★</p>
              <p className="text-[9px] opacity-80 uppercase tracking-wider">600 reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Wave / brush stroke bottom divider ──────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z"
            fill="#3b82f6"
          />
        </svg>
      </div>
    </section>
  );
}