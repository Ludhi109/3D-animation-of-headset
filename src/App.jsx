import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { Features } from "./components/Features";
import { Visualizer } from "./components/Visualizer";
import { GamingLifestyle } from "./components/GamingLifestyle";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollSequence } from "./components/ScrollSequence";
import { Dashboard } from "./components/Dashboard";
import { MusicToggle } from "./components/MusicToggle";
import { CartSidebar } from "./components/CartSidebar";
import { CheckoutForm } from "./components/CheckoutForm";
import { Global3DBackground } from "./components/Global3DBackground";
import premiumBg from "./assets/premium-bg.png";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [view, setView] = useState("landing"); // "landing" or "dashboard"
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, { x: clientX, y: clientY, duration: 0.6, ease: "power2.out" });
        gsap.to(cursorDotRef.current, { x: clientX, y: clientY, duration: 0.1 });
      }

      // Check for interactive elements
      const target = e.target;
      const isInteractive = target.closest("button") || target.closest("a") || target.closest(".cursor-pointer");
      setIsHovering(!!isInteractive);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setIsCheckoutOpen(true);
    }
  };

  const completeOrder = () => {
    alert("Payment successful! Your Sony WH-1000XM5 will be shipped immediately.");
    setCartItems([]);
    setIsCheckoutOpen(false);
    setCartOpen(false);
  };

  return (
    <main className="bg-transparent text-white selection:bg-neon-blue selection:text-black cursor-none overflow-x-hidden relative">
      <Navbar 
        cartCount={cartItems.length} 
        onCartClick={() => setCartOpen(true)}
        view={view}
        setView={setView}
      />

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Global3DBackground />
            
            {/* 1. Cinematic Scroll Sequence */}
            <ScrollSequence onComplete={() => setView("dashboard")} />

            {/* 2. Hero Section */}
            <div id="hero">
              <Hero />
            </div>

            {/* 3. Detail Section */}
            <div id="showcase">
              <FeatureShowcase />
            </div>

            {/* 4. Tech Section */}
            <Features />

            {/* 5. Audio Section */}
            <Visualizer />

            {/* 6. Uses Section */}
            <div id="uses">
              <GamingLifestyle />
            </div>

            {/* 7. Shop Now Section */}
            <div id="pricing">
              <Pricing onAddToCart={addToCart} onOrderNow={addToCart} />
            </div>

            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="fixed inset-0 z-50 bg-transparent"
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>

      <MusicToggle />
      
      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutForm 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        total={cartItems.reduce((sum, item) => sum + parseInt(item.price.replace("$", "")), 0)}
        onComplete={completeOrder}
      />

      {/* Custom Cursor */}
      <motion.div 
        ref={cursorRef} 
        animate={{ 
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? "#00f2ff" : "rgba(0, 242, 255, 0.5)"
        }}
        className="fixed top-0 left-0 pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <div className="w-10 h-10 border rounded-full transition-colors duration-300" />
      </motion.div>
      <div 
        ref={cursorDotRef} 
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-neon-blue rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${isHovering ? "scale-[2]" : "scale-1"} shadow-[0_0_10px_#00f2ff]`} 
      />

      {/* Global Cinematic Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[100] noise" />
    </main>
  );
}

export default App;
