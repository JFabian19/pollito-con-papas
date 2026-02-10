import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronUp, Flame, Facebook, Instagram, Phone, Clock, ChevronLeft, X } from 'lucide-react';
import { MENU_DATA } from './constants';
import { MenuItem, CartItem } from './types';
import ProductCard from './components/ProductCard';
import CategoryNav from './components/CategoryNav';
import CartSheet from './components/CartSheet';
import CategoryGrid from './components/CategoryGrid';

// Custom Icons not in lucide-react
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(true);

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

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);

  const handleWhatsAppClick = () => {
    // Replace with actual number
    window.open('https://wa.me/51984853323', '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-dark font-body text-white selection:bg-brand-primary selection:text-white relative flex flex-col">

      <div className="relative z-10 w-full flex-1">
        {/* Small Sticky Header (For scrolling utility) */}
        <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between bg-black/95 backdrop-blur-sm px-4 shadow-lg shadow-black/50 border-b border-white/5">
          <button
            onClick={() => {
              setSelectedCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
          >
            <img
              src="/logo.jpg"
              alt="Pollito con Papas"
              className="h-10 w-auto object-contain rounded-md"
            />
          </button>
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
        <section
          className="relative w-full pb-10 pt-8 rounded-b-[2.5rem] shadow-2xl z-10 overflow-hidden"
          style={{
            backgroundImage: "url('/embers.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark Overlay for contrast */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          {/* Decorative radial gradient */}
          <div className="absolute top-0 left-0 h-full w-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/40 via-transparent to-transparent z-10"></div>

          <div className="container mx-auto flex flex-col items-center justify-center text-center px-4 relative z-20">

            {/* Delivery Badge */}
            <div className="mb-6 inline-flex items-center gap-1 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-md border border-white/20 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">
                Te damos lo que te gusta, por delivery.
              </span>
            </div>

            {/* Schedule Badge */}
            <div className="mb-6 flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 backdrop-blur-md border border-white/10 shadow-lg">
              <Clock size={14} className="text-brand-accentStart" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">
                Todos los días: 1:00 PM - 10:30 PM
              </span>
            </div>

            {/* Main Title Logo */}
            <div className="mb-6 flex flex-col items-center justify-center">
              <h1 className="font-heading font-black italic leading-none drop-shadow-xl select-none text-4xl sm:text-5xl md:text-6xl text-white tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                Pollito con Papas
              </h1>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="mb-8 flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95 hover:shadow-green-500/50 border border-white/20"
            >
              <WhatsAppIcon className="h-5 w-5 text-white fill-white" />
              WhatsApp
            </button>

            {/* Social Media Icons */}
            <div className="flex items-center gap-8">
              <a href="https://www.facebook.com/share/1CKREUYPLw/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110 drop-shadow-lg">
                <Facebook size={28} />
              </a>
              <a href="https://www.tiktok.com/@ganasdepollitoconpapas?_r=1&_t=ZS-93lggJOOxLo" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110 drop-shadow-lg">
                <TikTokIcon className="h-7 w-7" />
              </a>
              <a href="https://www.instagram.com/ganasdepollitoconpapas?igsh=MXFtZThpY3VnYTI2bw==" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white transition-transform hover:scale-110 drop-shadow-lg">
                <Instagram size={28} />
              </a>
            </div>
          </div>
        </section>

        {/* View Switcher: Home (Categories) vs Detail (Product List) */}
        {!selectedCategory ? (
          <>
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

            {/* Section Divider: Carta */}
            <div className="flex items-center justify-center gap-4 px-4 my-8">
              <div className="h-1 flex-1 rounded-full bg-[#ED1C24] shadow-[0_0_10px_#ED1C24]"></div>
              <h2 className="font-heading text-2xl font-black italic tracking-widest text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ textShadow: '2px 2px 0px #000' }}>
                CARTA
              </h2>
              <div className="h-1 flex-1 rounded-full bg-[#ED1C24] shadow-[0_0_10px_#ED1C24]"></div>
            </div>

            {/* Category Grid */}
            <CategoryGrid
              categories={MENU_DATA.menu}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                window.scrollTo({ top: 0, behavior: 'auto' });
              }}
            />
          </>
        ) : (
          /* Category Detail View */
          <main className="container mx-auto max-w-5xl px-4 py-8 min-h-[60vh]">
            {/* Back Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span>VOLVER A CATEGORÍAS</span>
            </button>

            {MENU_DATA.menu.filter(c => c.categoria === selectedCategory).map((category) => (
              <section
                key={category.categoria}
                className="animate-fadeIn"
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
        )}

      </div>

      {/* FOOTER */}
      <footer className="relative z-20 mt-auto bg-black pt-12 pb-8 text-center text-gray-400 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-lg">

          {/* Payment Methods Section */}
          <div className="mb-10 rounded-2xl bg-white/5 p-6 border border-white/10">
            <h3 className="font-heading text-lg font-bold italic mb-4 text-white">MEDIOS DE PAGO</h3>

            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              <span className="bg-[#78288C] text-white px-3 py-1 rounded font-bold text-xs uppercase shadow-purple-500/20 shadow-lg">Yape</span>
              <span className="bg-[#00ADC2] text-white px-3 py-1 rounded font-bold text-xs uppercase shadow-cyan-500/20 shadow-lg">Plin</span>
              <span className="bg-green-600 text-white px-3 py-1 rounded font-bold text-xs uppercase shadow-green-500/20 shadow-lg">Efectivo</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-xs uppercase shadow-blue-500/20 shadow-lg">Transferencia</span>
            </div>

            {/* Yape Copy Section */}
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Yapear a nombre de Pollito con Papas</span>
              <div className="flex items-center gap-2 bg-black/60 rounded-xl p-2 pl-4 border border-white/10 w-full relative">
                <span className="font-mono text-lg font-bold tracking-widest flex-1 text-center text-white select-all">984 853 323</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('984853323');
                    alert('¡Número copiado!');
                  }}
                  className="bg-brand-primary h-10 w-10 flex items-center justify-center rounded-lg hover:bg-brand-primary/80 transition-colors text-white shadow-lg active:scale-95"
                  title="Copiar número"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">

            {/* Social Handle */}
            <a href="https://www.instagram.com/ganasdepollitoconpapas" target="_blank" rel="noopener noreferrer" className="font-heading font-bold text-white text-lg hover:text-brand-primary transition-colors">
              @ganasdepollitoconpapas
            </a>

            {/* Contact Info */}
            <div className="space-y-1 text-sm text-gray-400">
              <p>Ica - Ica - Perú</p>
              <a href="mailto:Ganasdepollitconpapas@gmail.com" className="block hover:text-white transition-colors">
                Ganasdepollitconpapas@gmail.com
              </a>
            </div>

            {/* Phone Link */}
            <a href="https://wa.me/51984853323" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
              +51 984 853 323
            </a>

            <div className="h-px w-20 bg-white/10 my-2"></div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Política de privacidad</a>
              <span className="text-white/10">•</span>
              <a href="#" className="hover:text-white transition-colors">Términos & condiciones</a>
              <span className="text-white/10">•</span>
              <a href="#" className="hover:text-white transition-colors border border-gray-700 px-2 py-0.5 rounded flex items-center gap-2">
                Libro de reclamaciones
              </a>
            </div>

            <p className="text-[10px] text-gray-600 mt-4">
              © {new Date().getFullYear()} Pollito con Papas.
            </p>
          </div>
        </div>
      </footer>

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

      {/* WhatsApp Floating Button - Bottom Right */}
      {showFloatingWhatsApp && (
        <div className={`fixed right-4 z-50 flex flex-col gap-2 ${totalItems > 0 && !isCartOpen ? 'bottom-28' : 'bottom-4'}`}>
          <div className="relative">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="h-8 w-8 text-white fill-white" />
            </button>
            <button
              onClick={() => setShowFloatingWhatsApp(false)}
              className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Cart Sheet */}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          const message = cart.map(item => ({
            quantity: item.quantity,
            name: item.nombre,
            price: (item.precio * item.quantity).toFixed(2)
          })).map(i => `${i.quantity} x ${i.name} - S/ ${i.price}`).join('%0A');

          const totalInfo = `*Total: S/ ${totalPrice.toFixed(2)}*`;
          const finalMessage = `Hola Pollito con Papas, quisiera hacer un pedido:%0A%0A${message}%0A%0A${totalInfo}`;

          window.open(`https://wa.me/51984853323?text=${finalMessage}`, '_blank');
          setCart([]);
          setIsCartOpen(false);
        }}
      />
    </div>
  );
};

export default App;