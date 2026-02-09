import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronUp, Flame, Facebook, Instagram, Phone, Clock } from 'lucide-react';
import { MENU_DATA } from './constants';
import { MenuItem, CartItem } from './types';
import ProductCard from './components/ProductCard';
import CategoryNav from './components/CategoryNav';
import CartSheet from './components/CartSheet';

// Custom Icons not in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(MENU_DATA.menu[0].categoria);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Add Item to Cart
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.nombre === item.nombre);
      if (existing) {
        return prev.map((i) =>
          i.nombre === item.nombre ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Update Item Quantity
  const updateQuantity = (itemName: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.nombre === itemName) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  // Scroll to Category
  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element) {
      const offset = 120; // Height of sticky header + nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  const handleWhatsAppClick = () => {
    // Replace with actual number
    window.open('https://wa.me/51984853323', '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-dark pb-24 font-body text-white selection:bg-brand-primary selection:text-white">

      {/* Small Sticky Header (For scrolling utility) */}
      <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between bg-black/95 backdrop-blur-sm px-4 shadow-lg shadow-black/50 border-b border-white/5">
        <span className="font-heading text-lg font-extrabold italic text-white">
          POLLITO CON PAPAS
        </span>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-card text-white hover:bg-brand-card/80 transition-colors border border-white/10"
        >
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-bold shadow-sm">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* NEW HERO SECTION */}
      <section className="relative w-full bg-brand-primary pb-10 pt-8 rounded-b-[2.5rem] shadow-2xl z-10 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 h-full w-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

        <div className="container mx-auto flex flex-col items-center justify-center text-center px-4 relative z-20">

          {/* Delivery Badge */}
          <div className="mb-6 inline-flex items-center gap-1 rounded-full bg-black/30 px-4 py-1.5 backdrop-blur-md border border-white/10">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              Únicamente pedidos a Delivery
            </span>
          </div>

          {/* Schedule Badge */}
          <div className="mb-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/10">
            <Clock size={14} className="text-brand-accentStart" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
              Todos los días: 1:00 PM - 10:30 PM
            </span>
          </div>

          {/* Big P Logo (Minimalist) */}
          {/* Main Title Logo */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <h1 className="flex flex-col items-center font-heading font-black italic leading-none drop-shadow-xl select-none">
              <span className="text-6xl text-white">POLLITO</span>
              <span className="text-5xl text-black">CON PAPAS</span>
            </h1>
          </div>

          {/* WhatsApp CTA */}
          <button
            onClick={handleWhatsAppClick}
            className="mb-8 flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:scale-105 active:scale-95 hover:shadow-green-500/30"
          >
            <Phone size={20} fill="currentColor" />
            Haz tu pedido en wsp ahora
          </button>

          {/* Social Media Icons */}
          <div className="flex items-center gap-8">
            <a href="https://www.facebook.com/share/1CKREUYPLw/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-transform hover:scale-110">
              <Facebook size={28} />
            </a>
            <a href="https://www.tiktok.com/@ganasdepollitoconpapas?_r=1&_t=ZS-93lggJOOxLo" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-transform hover:scale-110">
              <TikTokIcon className="h-7 w-7" />
            </a>
            <a href="https://www.instagram.com/ganasdepollitoconpapas?igsh=MXFtZThpY3VnYTI2bw==" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-transform hover:scale-110">
              <Instagram size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Category Navigation (Sticky below hero) */}
      <CategoryNav
        categories={MENU_DATA.menu}
        activeCategory={activeCategory}
        onSelectCategory={scrollToCategory}
      />

      {/* UPDATED PROMO BANNER */}
      <div className="relative mx-4 mt-8 overflow-hidden rounded-2xl bg-brand-card p-[1px] solar-gradient-border">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0F0F0F] px-6 py-6 text-center">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-5 w-5 text-brand-accentStart" />
            <span className="font-heading font-bold text-brand-accentStart text-sm tracking-wider uppercase">Oferta los miércoles</span>
            <Flame className="h-5 w-5 text-brand-accentStart" />
          </div>

          <h2 className="font-heading text-xl font-extrabold italic text-white mb-3">
            #ᴛᴇɴᴅᴇɴᴄɪᴀ
          </h2>

          <div className="space-y-1 text-sm text-gray-300 font-body">
            <p>Pollo Entero <span className="text-brand-primary font-bold">s/50.00</span></p>
            <p>Medio Pollo <span className="text-brand-primary font-bold">s/25.00</span></p>
            <p className="text-xs text-gray-500 mt-1">+ complementos</p>
          </div>

          <a
            href="https://wa.me/51984853323"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <p className="text-xs font-bold text-white">📲 Reservas 24hrs.</p>
          </a>

          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Menu Sections */}
      <main className="container mx-auto max-w-5xl space-y-12 px-4 py-8">
        {MENU_DATA.menu.map((category) => (
          <section
            key={category.categoria}
            ref={(el) => (sectionRefs.current[category.categoria] = el)}
            className="scroll-mt-36"
          >
            <div className="mb-6 flex items-end gap-3 border-b border-white/10 pb-2">
              <h2 className="font-heading text-2xl font-extrabold italic tracking-wide text-brand-primary">
                {category.categoria.toUpperCase()}
              </h2>
              <div className="mb-1 h-1 flex-1 rounded-full bg-gradient-to-r from-brand-primary/50 to-transparent"></div>
            </div>

            {category.descripcion && (
              <p className="mb-6 -mt-2 text-sm text-gray-400 italic">
                {category.descripcion}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, index) => (
                <ProductCard
                  key={index}
                  item={item}
                  onAdd={addToCart}
                  index={index}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Floating Action Button (Cart) - Visible only when items exist */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex w-full max-w-md items-center justify-between rounded-xl bg-brand-primary p-4 shadow-[0_0_20px_rgba(237,28,78,0.4)] transition-transform active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="font-heading text-xs font-bold uppercase text-white/80">Total estimado</span>
              <span className="font-heading text-xl font-extrabold italic">S/ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-black/20 px-4 py-2">
              <span className="font-bold">Ver Carrito</span>
              <ChevronUp size={18} />
            </div>
          </button>
        </div>
      )}

      {/* WhatsApp Floating Button - Bottom Left */}
      <button
        onClick={handleWhatsAppClick}
        className={`fixed left-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366]/90 px-4 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#25D366] active:scale-95 ${totalItems > 0 && !isCartOpen ? 'bottom-28' : 'bottom-4'
          }`}
      >
        <Phone size={18} className="text-white" />
        <span className="font-heading text-xs font-bold uppercase tracking-wide text-white">Pide por WSP</span>
      </button>

      {/* Cart Sheet */}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          /* WhatsApp Integration (Temporarily Disabled)
          const message = cart.map(item => ({
            quantity: item.quantity,
            name: item.nombre,
            price: (item.precio * item.quantity).toFixed(2)
          })).map(i => `${i.quantity} x ${i.name} - S/ ${i.price}`).join('%0A');
          
          const totalInfo = `*Total: S/ ${totalPrice.toFixed(2)}*`;
          const finalMessage = `Hola Pollito con Papas, quisiera hacer un pedido:%0A%0A${message}%0A%0A${totalInfo}`;
          
          window.open(`https://wa.me/51984853323?text=${finalMessage}`, '_blank');
          */

          alert('¡Gracias por tu pedido! (El pedido por WhatsApp se activará pronto)');
          setCart([]);
          setIsCartOpen(false);
        }}
      />
    </div>
  );
};

export default App;