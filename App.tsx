import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronUp, Flame, Facebook, Instagram, Phone, Clock, ChevronLeft, X, MapPin, Download, Share2 } from 'lucide-react';
import { MENU_DATA as FALLBACK_MENU } from './constants';
import { MenuItem, CartItem, MenuCategory } from './types';
import { fetchSheetData, SheetPromo } from './services/googleSheets';
import ProductCard from './components/ProductCard';
import CategoryNav from './components/CategoryNav';
import CartSheet from './components/CartSheet';
import CategoryGrid from './components/CategoryGrid';
import NavigationMenu from './components/NavigationMenu';

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
  const [menuData, setMenuData] = useState<MenuCategory[]>(FALLBACK_MENU.menu);
  const [promoData, setPromoData] = useState<SheetPromo | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const sheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
      if (sheetId) {
        const data = await fetchSheetData(sheetId);
        if (data) {
          setMenuData(data.menuData.menu);
          setPromoData(data.promoData);
        }
      }
    };
    loadData();
  }, []);

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
    <div className="min-h-screen bg-brand-dark font-body text-gray-900 selection:bg-brand-primary selection:text-white relative flex flex-col">

      <div className="relative z-10 w-full flex-1">
        {/* Small Sticky Header (For scrolling utility) */}
        <header className="sticky top-0 z-50 flex h-[60px] items-center justify-center bg-white/95 backdrop-blur-sm px-4 shadow-lg shadow-gray-200 border-b border-gray-200">
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
          <NavigationMenu
            onHome={() => {
              setSelectedCategory(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMenu={() => {
              setSelectedCategory(null);
              setTimeout(() => {
                const element = document.getElementById('categories-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
          />
          <button
            onClick={() => setIsCartOpen(true)}
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-card text-brand-primary hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
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
              <MapPin size={14} className="text-brand-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">
                Te damos lo que te gusta, por delivery.
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
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/share/1CKREUYPLw/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#1877F2] hover:bg-gray-100 transition-transform hover:scale-110 shadow-lg">
                <Facebook size={26} fill="currentColor" />
              </a>
              <a href="https://www.tiktok.com/@ganasdepollitoconpapas?_r=1&_t=ZS-93lggJOOxLo" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-black hover:bg-gray-100 transition-transform hover:scale-110 shadow-lg">
                <TikTokIcon className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/ganasdepollitoconpapas?igsh=MXFtZThpY3VnYTI2bw==" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-12 w-12 rounded-full bg-white text-[#E4405F] hover:bg-gray-100 transition-transform hover:scale-110 shadow-lg">
                <Instagram size={26} />
              </a>
            </div>
          </div>
        </section>

        {/* View Switcher: Home (Categories) vs Detail (Product List) */}
        {!selectedCategory ? (
          <>
            {/* UPDATED PROMO BANNER - Horizontal Layout on Mobile */}
            <div className="relative mx-4 mt-8 overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200 group cursor-default">
              <div className="flex flex-row h-60 sm:h-72 md:h-80">
                {/* Image Section - Left - Maximum size */}
                <div className="w-1/2 relative bg-gray-50">
                  <img
                    src={promoData?.imagen_url || "/banner.png"}
                    alt={promoData?.titulo || "Promo"}
                    className="absolute inset-0 w-full h-full object-contain p-0 md:p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Section - Right */}
                <div className="w-1/2 p-2 sm:p-6 md:p-8 flex flex-col justify-center bg-white relative">

                  <div className="flex items-center gap-2 mb-1 md:mb-4">
                    <Flame className="h-3 w-3 md:h-6 md:w-6 text-brand-primary" />
                    <span className="font-heading font-bold text-brand-primary text-[10px] md:text-base tracking-widest uppercase">
                      {promoData?.subtitulo || "¡PROMO DE LA SEMANA!"}
                    </span>
                  </div>

                  <h2 className="font-heading text-sm sm:text-2xl md:text-4xl font-black italic text-gray-900 mb-2 md:mb-6 leading-none uppercase whitespace-pre-line">
                    {promoData?.titulo || "MIÉRCOLES DE\nPOLLITO"}
                  </h2>

                  <div className="space-y-1 md:space-y-4 w-full">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1 md:pb-2 border-dashed">
                      <span className="text-gray-600 font-bold text-xs md:text-lg">{promoData?.item1_nombre || "Pollo entero"}</span>
                      <span className="text-brand-primary font-black text-sm md:text-3xl">s/{promoData?.item1_precio || "50.00"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1 md:pb-2 border-dashed">
                      <span className="text-gray-600 font-bold text-xs md:text-lg">{promoData?.item2_nombre || "Medio pollo"}</span>
                      <span className="text-brand-primary font-black text-sm md:text-2xl">s/{promoData?.item2_precio || "25.00"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1 md:pb-2 border-dashed">
                      <span className="text-gray-600 font-bold text-xs md:text-lg">{promoData?.item3_nombre || "Cuarto de pollo"}</span>
                      <span className="text-brand-primary font-black text-sm md:text-2xl">s/{promoData?.item3_precio || "16.00"}</span>
                    </div>
                  </div>

                  <div className="mt-2 md:mt-6 flex items-center gap-2 text-gray-400">
                    <div className="h-1 w-1 rounded-full bg-gray-300"></div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      Incluye complementos
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Section Divider: Carta */}
            <div id="categories-section" className="flex items-center justify-center gap-4 px-4 my-8 scroll-mt-24">
              <div className="h-1 flex-1 rounded-full bg-[#ED1C24] shadow-[0_0_10px_#ED1C24]"></div>
              <h2 className="font-heading text-2xl font-black italic tracking-widest text-gray-900 uppercase drop-shadow-sm">
                CARTA
              </h2>
              <div className="h-1 flex-1 rounded-full bg-[#ED1C24] shadow-[0_0_10px_#ED1C24]"></div>
            </div>

            {/* Category Grid */}
            <CategoryGrid
              categories={menuData}
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
              className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-primary transition-colors"
            >
              <ChevronLeft size={20} />
              <span>VOLVER A CATEGORÍAS</span>
            </button>

            {menuData.filter(c => c.categoria === selectedCategory).map((category) => (
              <section
                key={category.categoria}
                className="animate-fadeIn"
              >
                <div className="mb-6 flex items-end gap-3 border-b border-gray-200 pb-2">
                  <h2 className="font-heading text-2xl font-extrabold italic tracking-wide text-brand-primary">
                    {category.categoria.toUpperCase()}
                  </h2>
                  <div className="mb-1 h-1 flex-1 rounded-full bg-gradient-to-r from-brand-primary/50 to-transparent"></div>
                </div>

                {category.descripcion && (
                  <p className="mb-6 -mt-2 text-sm text-gray-600 italic">
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
      <footer className="relative z-20 mt-auto bg-gray-50 pt-12 pb-8 text-center text-gray-600 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-lg">

          {/* Payment Methods Section */}
          <div className="mb-10 flex flex-col items-center">

            <h3 className="font-heading text-sm font-bold text-gray-800 mb-4 text-center uppercase tracking-wide">
              METODOS DE PAGO
            </h3>

            {/* Payment Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-[280px]">
              {/* Visa */}
              <div className="flex items-center justify-center p-2 rounded-xl bg-white border border-gray-200 shadow-sm h-14 overflow-hidden relative">
                <img src="/visa.png" alt="Visa" className="h-full w-full object-contain p-1" />
              </div>

              {/* Mastercard */}
              <div className="flex items-center justify-center p-2 rounded-xl bg-white border border-gray-200 shadow-sm h-14 overflow-hidden relative">
                <img src="/mastercard.svg" alt="Mastercard" className="h-full w-full object-contain p-1" />
              </div>

              {/* Yape */}
              <div className="flex items-center justify-center p-2 rounded-xl bg-white border border-gray-200 shadow-sm h-14 overflow-hidden relative">
                <img src="/yap.png" alt="Yape" className="h-full w-full object-contain p-1 scale-110" />
              </div>

              {/* Plin */}
              <div className="flex items-center justify-center p-2 rounded-xl bg-white border border-gray-200 shadow-sm h-14 overflow-hidden relative">
                <img src="/plin inter.png" alt="Plin" className="h-full w-full object-contain p-1 scale-110" />
              </div>
            </div>

            {/* Business Info & QR */}
            <h3 className="font-heading text-sm font-bold text-gray-800 mb-3 text-center uppercase tracking-wide">
              Chicken Grill and Fries SAC
            </h3>

            <div className="relative p-2 bg-white rounded-xl border border-gray-200 shadow-md">
              {/* QR Code - Click to Download */}
              <a
                href="/qr.jpg"
                download="ChickenGrill_QR.jpg"
                className="block w-32 h-32 bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer hover:opacity-90 transition-opacity"
                title="Haz click para descargar el QR"
              >
                <img
                  src="/qr.jpg"
                  alt="QR Code"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerText = 'QR Code'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="text-white drop-shadow-md" size={24} />
                </div>
              </a>
            </div>

          </div>

          <div className="flex flex-col items-center gap-6">

            {/* Social Handle */}


            {/* Contact Info */}
            <div className="space-y-1 text-sm text-gray-600">
              <p>Ica - Ica - Perú</p>
              <a href="mailto:ganasdepollitconpapas@gmail.com" className="block hover:text-gray-900 transition-colors">
                ganasdepollitconpapas@gmail.com
              </a>
            </div>

            {/* Phone Link */}
            <a href="https://wa.me/51984853323" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-800 hover:text-brand-primary transition-colors">
              +51 984 853 323
            </a>
            <p className="text-xs text-gray-500 font-medium -mt-4">
              Lunes a Domingo de 1:00 pm a 10:30 pm
            </p>

            <div className="h-px w-20 bg-gray-300 my-2"></div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Política de privacidad</a>
              <span className="text-gray-400">•</span>
              <a href="#" className="hover:text-gray-900 transition-colors">Términos & condiciones</a>
              <span className="text-gray-400">•</span>
              <a href="#" className="hover:text-gray-900 transition-colors border border-gray-300 px-2 py-0.5 rounded flex items-center gap-2">
                Libro de reclamaciones
              </a>
            </div>

            <p className="text-[10px] text-gray-600 mt-4">
              © 2026 Pollito con Papas. Todos los derechos reservados.
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
            <div className="flex items-center gap-2 rounded-lg bg-black/10 px-4 py-2 text-gray-900">
              <span className="font-bold">Ver Carrito</span>
              <ChevronUp size={18} />
            </div>
          </button>
        </div>
      )}

      {/* WhatsApp Floating Button - Middle Right */}
      {showFloatingWhatsApp && (
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {/* WhatsApp Button */}
          <div className="relative group">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-8 w-8 text-white fill-white" />
            </button>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Contáctanos
            </span>
          </div>

          {/* Share Button */}
          <div className="relative group">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Pollito con Papas',
                    text: '¡Mira esta deliciosa carta de Pollito con Papas!',
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  // Fallback for desktop/unsupported
                  navigator.clipboard.writeText(window.location.href);
                  alert('¡Enlace copiado al portapapeles!');
                }
              }}
              className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white text-white"
              aria-label="Compartir"
            >
              <Share2 size={24} />
            </button>
            <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/70 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Compartir
            </span>
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