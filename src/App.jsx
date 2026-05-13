import { useEffect, useRef, useState, Suspense } from "react";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { ExplodedView } from "./components/ExplodedView";
import { Visualizer } from "./components/Visualizer";
import { ColorVariants } from "./components/ColorVariants";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CartSidebar } from "./components/CartSidebar";
import { CheckoutForm } from "./components/CheckoutForm";
import { ErrorBoundary } from "./components/ErrorBoundary";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const LoadingScreen = () => (
  <motion.div 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-sony-black flex flex-col items-center justify-center"
  >
    <div className="w-24 h-24 relative">
      <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-4 border-t-neon-blue rounded-full"
      />
    </div>
    <motion.h2 
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="mt-8 text-sm tracking-[0.5em] text-neon-blue font-bold uppercase"
    >
      Initializing Sound
    </motion.h2>
  </motion.div>
);

const SuccessModal = ({ isOpen, onClose, productName, customerName }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-sony-black border border-neon-blue/30 p-12 rounded-[3rem] text-center max-w-lg w-full neon-glow relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
          
          <div className="w-24 h-24 bg-neon-blue/10 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(0,242,255,0.1)]">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 12 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f2ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>
          </div>
          
          <h3 className="text-4xl font-bold mb-6 tracking-tight">Order Confirmed</h3>
          <p className="text-gray-400 mb-10 font-light leading-relaxed">
            Thank you, <span className="text-neon-blue font-bold">{customerName}</span>! <br />
            Your <span className="text-white font-medium">{productName || "premium audio experience"}</span> is on its way. <br />
            Prepare for the ultimate silence.
          </p>
          
          <button
            onClick={onClose}
            className="w-full py-5 bg-neon-blue text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(0,242,255,0.4)] cursor-pointer relative z-10"
          >
            Continue Experience
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderedProduct, setOrderedProduct] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  
  const [explosionFactor, setExplosionFactor] = useState(0);
  const [headsetColor, setHeadsetColor] = useState("#050505");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("sony-cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [is3DVisible, setIs3DVisible] = useState(true);
  
  const explodedSectionRef = useRef();
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  useEffect(() => {
    localStorage.setItem("sony-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace("$", "")), 0);
    setTotalPrice(`$${total}`);
    setOrderedProduct("order");
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderNow = (product) => {
    setTotalPrice(product.price);
    setOrderedProduct(product.name);
    setIsCheckoutOpen(true);
  };

  const onConfirmOrder = (details) => {
    console.log("Order Received:", {
      product: orderedProduct,
      total: totalPrice,
      customer: details
    });
    setCustomerDetails(details);
    setIsCheckoutOpen(false);
    setShowSuccess(true);
    setCart([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.5,
          ease: "power2.out"
        });
        gsap.to(cursorDotRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.1
        });
      }
    };

    const handleHover = () => {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3 });
    };

    const handleUnhover = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll("button, a, .cursor-pointer");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    ScrollTrigger.create({
      id: "explodedTrigger",
      trigger: "#exploded",
      start: "top center",
      end: "bottom center",
      onToggle: (self) => updateVisibility()
    });

    const updateVisibility = () => {
      const explodedActive = ScrollTrigger.getById("explodedTrigger")?.isActive;
      setIs3DVisible(!explodedActive);
    };

    if (explodedSectionRef.current) {
      ScrollTrigger.create({
        trigger: explodedSectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setExplosionFactor(self.progress);
        },
      });
    }

    const sections = gsap.utils.toArray("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loading]);

  return (
    <main className="bg-sony-black text-white selection:bg-neon-blue selection:text-black cursor-none">
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        productName={orderedProduct}
        customerName={customerDetails?.name}
      />

      <CheckoutForm 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onConfirm={onConfirmOrder} 
        productPrice={totalPrice}
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
        onCheckout={handleCheckout}
      />

      <motion.div 
        ref={cursorRef} 
        className="fixed top-0 left-0 pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neon-blue fill-current">
          <path d="M5.5 3L19 12L5.5 21V15L12 12L5.5 9V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      <div ref={cursorDotRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-neon-blue rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00f2ff]" />
      
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className={`transition-opacity duration-1000 ${is3DVisible ? 'opacity-100' : 'opacity-0'}`}>
        <ErrorBoundary fallback={<div className="fixed inset-0 flex items-center justify-center bg-sony-black text-neon-blue text-center p-4">Model failed to load.<br/>Falling back to premium experience.</div>}>
          <Suspense fallback={null}>
            <Experience explosionFactor={explosionFactor} color={headsetColor} />
          </Suspense>
        </ErrorBoundary>
      </div>
      
      <div className={`relative z-10 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <div id="hero" className="relative z-10">
          <Hero />
        </div>
        
        <div id="features" className="relative z-10">
          <Features />
        </div>

        <div ref={explodedSectionRef} id="exploded" className="relative z-10">
          <ExplodedView />
        </div>
        
        <div id="visualizer" className="relative z-10">
          <Visualizer />
        </div>
        
        <div className="relative z-10">
          <ColorVariants activeColor={headsetColor} onColorChange={setHeadsetColor} />
        </div>
        
        <div className="relative z-10">
          <Testimonials />
        </div>
        
        <div id="pricing" className="relative z-10">
          <Pricing onAddToCart={addToCart} onOrderNow={handleOrderNow} />
        </div>

        <div className="relative z-10">
          <Footer />
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-[100] mix-blend-overlay noise" />
      <div className="fixed inset-0 pointer-events-none z-[50] bg-gradient-to-b from-black/20 via-transparent to-black/20" />
    </main>
  );
}

export default App;
