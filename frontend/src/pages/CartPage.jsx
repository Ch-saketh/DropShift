// src/pages/CartPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Tag, ChevronRight, Lock } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage({ onCheckout }) {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [removingKey, setRemovingKey] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99;
  const total = subtotal - discount + shipping;
  const toFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - (subtotal - discount));

  const handleUpdateQty = (item, delta) => {
    updateQty(item.id, item.size, delta);
  };

  const removeItem = (item) => {
    const key = `${item.id}-${item.size}`;
    setRemovingKey(key);
    setTimeout(() => {
      removeFromCart(item.id, item.size);
      setRemovingKey(null);
    }, 300);
  };

  const applyPromo = () => {
    if (promoInput.toUpperCase() === "DROP10") {
      setPromoApplied("DROP10");
      setPromoError("");
    } else {
      setPromoError("Invalid promo code.");
      setTimeout(() => setPromoError(""), 2500);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6">
        <div className="w-24 h-24 border-2 border-dashed border-slate-200 flex items-center justify-center">
          <ShoppingBag size={28} className="text-slate-300" />
        </div>
        <div className="text-center">
          <p className="text-3xl font-black uppercase tracking-tighter text-[#0b2240]">Your bag<br />is empty.</p>
          <p className="text-sm text-slate-400 mt-2">You haven't added anything yet.</p>
        </div>
        <button
          onClick={() => navigate("/market")}
          className="flex items-center gap-2 bg-[#ff5700] text-white font-black uppercase text-xs tracking-widest px-8 py-4 hover:bg-[#e04e00] transition-colors"
        >
          <ShoppingBag size={14} />
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative overflow-hidden bg-[#0b2240] px-6 py-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      >
        <div className="absolute left-0 top-0 h-1 w-16 bg-[#ff5700]" />
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => navigate("/market")}
            className="group mb-4 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={11} className="transition-transform group-hover:-translate-x-0.5" />
            Continue Shopping
          </button>
          <div className="flex items-end gap-4">
            <h1 className="font-black uppercase leading-[0.9] tracking-tighter text-white text-4xl md:text-6xl">
              Your<br />
              <span className="text-[#3b82f6]">Bag.</span>
            </h1>
            <span className="mb-1 text-sm font-black text-slate-400">
              {cartItems.reduce((a, i) => a + i.qty, 0)} item{cartItems.reduce((a, i) => a + i.qty, 0) !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {toFreeShip > 0 && (
        <div className="border-b border-[#3b82f6]/20 bg-[#f0f4ff] px-6 py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#0b2240]">
              Add <span className="text-[#ff5700]">${toFreeShip.toFixed(2)}</span> more for free shipping
            </p>
            <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#3b82f6] transition-all duration-500"
                style={{ width: `${Math.min(100, ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 items-start px-6 py-10">
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 pb-2 border-b border-slate-100">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Item</span>
            <span className="w-24 text-center text-[9px] font-black uppercase tracking-widest text-slate-400">Qty</span>
            <span className="w-20 text-right text-[9px] font-black uppercase tracking-widest text-slate-400">Price</span>
          </div>

          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className={`grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] gap-4 md:gap-6 items-center border border-slate-100 p-4 transition-all duration-300 ${
                removingKey === `${item.id}-${item.size}` ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {/* ─── ACTION: DYNAMICALLY REDIRECT VIA LOGO IMAGE ─── */}
              <button
                onClick={() => navigate(`/product/${item.id}`)}
                className="group w-20 h-24 md:w-24 md:h-28 overflow-hidden bg-slate-50 flex-shrink-0 text-left outline-none"
                title={`View ${item.name}`}
              >
                <img
                  src={item.images?.[0] || item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </button>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#3b82f6]">
                  {item.brand}
                </span>
                
                {/* ─── ACTION: DYNAMICALLY REDIRECT VIA TITLE TEXT ─── */}
                <button
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="text-left font-black uppercase tracking-tight text-[#0b2240] leading-tight text-sm hover:text-[#ff5700] transition-colors outline-none"
                >
                  {item.name}
                </button>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                  Size: <span className="text-[#0b2240]">{item.size}</span>
                </p>

                <p className="text-sm font-black text-[#0b2240] mt-2 md:hidden">
                  ${(item.price * item.qty).toFixed(2)}
                </p>

                <div className="flex items-center gap-3 mt-2 md:hidden">
                  <div className="flex items-center border border-slate-200">
                    <button
                      onClick={() => handleUpdateQty(item, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Minus size={11} strokeWidth={3} />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-[#0b2240]">{item.qty}</span>
                    <button
                      onClick={() => handleUpdateQty(item, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Plus size={11} strokeWidth={3} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item)}
                    className="text-slate-300 hover:text-[#ff5700] transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="hidden md:flex items-center border border-slate-200 w-24">
                <button
                  onClick={() => handleUpdateQty(item, -1)}
                  className="w-8 h-9 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Minus size={11} strokeWidth={3} className="text-[#0b2240]" />
                </button>
                <span className="flex-1 text-center text-xs font-black text-[#0b2240]">{item.qty}</span>
                <button
                  onClick={() => handleUpdateQty(item, 1)}
                  className="w-8 h-9 flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Plus size={11} strokeWidth={3} className="text-[#0b2240]" />
                </button>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2 w-20">
                <span className="text-sm font-black text-[#0b2240]">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(item)}
                  className="text-slate-300 hover:text-[#ff5700] transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-[340px] flex-shrink-0 lg:sticky lg:top-24">
          <div className="border border-slate-200">
            <div className="bg-[#0b2240] px-5 py-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">
                Order Summary
              </h2>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Subtotal</span>
                  <span className="text-sm font-black text-[#0b2240]">${subtotal.toFixed(2)}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#ff5700] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Tag size={10} />
                      {promoApplied} (10% off)
                    </span>
                    <span className="text-sm font-black text-[#ff5700]">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Shipping</span>
                  <span className={`text-sm font-black ${shipping === 0 ? "text-green-600" : "text-[#0b2240]"}`}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Est. Tax</span>
                  <span className="text-xs text-slate-400 font-bold">Calculated at checkout</span>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-[#0b2240]">Total</span>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#0b2240]">${total.toFixed(2)}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider">USD · excl. tax</p>
                </div>
              </div>

              {!promoApplied ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                    placeholder="Promo code"
                    className={`flex-1 border text-xs font-bold uppercase px-3 py-2.5 outline-none placeholder:normal-case placeholder:font-normal transition-colors ${
                      promoError ? "border-[#ff5700]" : "border-slate-200 focus:border-[#0b2240]"
                    }`}
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 bg-slate-100 text-[#0b2240] text-[10px] font-black uppercase tracking-widest hover:bg-[#0b2240] hover:text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-700 flex items-center gap-1.5">
                    <Tag size={10} />
                    {promoApplied} applied
                  </span>
                  <button
                    onClick={() => { setPromoApplied(null); setPromoInput(""); }}
                    className="text-[9px] font-black uppercase text-green-600 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[10px] font-bold text-[#ff5700] -mt-2">{promoError}</p>
              )}

              <button
                onClick={() => onCheckout?.({ items: cartItems, total })}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#0b2240] text-white text-xs font-black uppercase tracking-widest hover:bg-[#0a1e38] transition-colors group"
              >
                <Lock size={13} strokeWidth={2.5} />
                Proceed to Checkout
                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((p) => (
                  <span
                    key={p}
                    className="text-[8px] font-black uppercase tracking-wider border border-slate-200 px-2 py-1 text-slate-400"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <p className="text-[9px] text-center text-slate-400 leading-relaxed">
                🔒 Secure 256-bit SSL checkout. Your data is always protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}