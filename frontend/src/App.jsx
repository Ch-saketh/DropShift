// src/App.jsx
import { useState, createContext, useContext } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Home from "./Home/Home.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";

// ─── Cart Context ─────────────────────────────────────────────────────────────
// Provides cart state + helpers to any component in the tree.
// Usage:  const { cartItems, addToCart, removeFromCart, updateQty, cartCount } = useCart();
export const CartContext = createContext(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <App>");
  return ctx;
}

// ─── Simple client-side router ────────────────────────────────────────────────
// Pages:  "home" | "shop" | "product" | "cart" | "checkout"
// We intentionally avoid react-router-dom so the project works out-of-the-box
// with a fresh Vite scaffold. Swap this for <BrowserRouter> whenever you're ready.

export default function App() {
  // ── Routing state ──────────────────────────────────────────────────────────
  const [page,           setPage]           = useState("home");        // current page key
  const [activeProduct,  setActiveProduct]  = useState(null);          // product passed to detail page

  // ── Cart state ─────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);

  // Add or increment
  const addToCart = (product) => {
    setCartItems((prev) => {
      const key      = `${product.id}-${product.size}`;
      const existing = prev.find((i) => `${i.id}-${i.size}` === key);
      if (existing)
        return prev.map((i) =>
          `${i.id}-${i.size}` === key ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...product, qty: product.qty ?? 1 }];
    });
  };

  // Remove by id + size combo
  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  // Change quantity (removes item if qty reaches 0)
  const updateQty = (id, size, delta) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart   = ()  => setCartItems([]);
  const cartCount   = cartItems.reduce((acc, i) => acc + i.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const navigate = {
    home:    ()        => { setPage("home");    setActiveProduct(null); window.scrollTo(0, 0); },
    shop:    ()        => { setPage("shop");    setActiveProduct(null); window.scrollTo(0, 0); },
    product: (product) => { setPage("product"); setActiveProduct(product); window.scrollTo(0, 0); },
    cart:    ()        => { setPage("cart");    window.scrollTo(0, 0); },
    checkout:()        => { setPage("checkout");window.scrollTo(0, 0); },
  };

  // ── Page renderer ──────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {

      case "home":
        return (
          <>
            <Hero onShopNow={navigate.shop} />
            <Home onShopNow={navigate.shop} onViewProduct={navigate.product} />
          </>
        );

      case "shop":
        return (
          <ShopPage
            onAddToBag={(product) => addToCart({ ...product, size: product.sizes?.[1] ?? "M" })}
            onViewProduct={navigate.product}
          />
        );

      case "product":
        return (
          <ProductDetailPage
            product={activeProduct}
            onBack={navigate.shop}
            onAddToCart={(item) => {
              addToCart(item);
              // Optionally navigate straight to cart:
              // navigate.cart();
            }}
          />
        );

      case "cart":
        return (
          <CartPage
            initialItems={cartItems}
            onBack={navigate.shop}
            onCheckout={navigate.checkout}
          />
        );

      case "checkout":
        // ── Placeholder — swap with your real checkout flow ──────────────
        return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6">
            <div
              className="w-20 h-20 bg-[#0b2240] flex items-center justify-center"
            >
              <span className="text-2xl">✓</span>
            </div>
            <div className="text-center max-w-sm">
              <p className="text-4xl font-black uppercase tracking-tighter text-[#0b2240] leading-tight">
                Checkout<br />
                <span className="text-[#3b82f6]">Coming Soon.</span>
              </p>
              <p className="text-sm text-slate-400 mt-3">
                This is a placeholder. Wire in Stripe, Shopify, or your payment provider here.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={navigate.shop}
                className="px-6 py-3 border-2 border-[#0b2240] text-[#0b2240] text-xs font-black uppercase tracking-widest hover:bg-[#0b2240] hover:text-white transition-colors"
              >
                Back to Shop
              </button>
              <button
                onClick={() => { clearCart(); navigate.home(); }}
                className="px-6 py-3 bg-[#ff5700] text-white text-xs font-black uppercase tracking-widest hover:bg-[#e04e00] transition-colors"
              >
                Clear & Go Home
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      <div className="flex flex-col min-h-screen font-sans antialiased">

        {/* Persistent top navigation */}
        <Navbar
          cartCount={cartCount}
          onLogoClick={navigate.home}
          onShopClick={navigate.shop}
          onCartClick={navigate.cart}
          currentPage={page}
        />

        {/* Page content */}
        <main className="flex-1">
          {renderPage()}
        </main>

        {/* ── Minimal footer ──────────────────────────────────────────────── */}
        <footer className="bg-[#0b2240] text-slate-400 py-10 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            {/* Brand */}
            <div>
              <p className="text-white font-black uppercase tracking-tight text-lg">
                Drop<span className="text-[#ff5700]">Shift</span>
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-0.5">
                No contracts. No retainers. No BS.
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                ["Shop",     navigate.shop],
                ["Cart",     navigate.cart],
                ["About",    navigate.home],
                ["FAQs",     navigate.home],
                ["Returns",  navigate.home],
              ].map(([label, handler]) => (
                <button
                  key={label}
                  onClick={handler}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Legal */}
            <p className="text-[9px] uppercase tracking-widest text-slate-600">
              © {new Date().getFullYear()} DropShift · All rights reserved
            </p>
          </div>
        </footer>

      </div>
    </CartContext.Provider>
  );
}