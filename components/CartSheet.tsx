import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemName: string, delta: number) => void;
  onCheckout: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.precio * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sheet Content */}
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-t-2xl bg-[#121212] shadow-2xl ring-1 ring-white/10 transition-transform duration-300 sm:rounded-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-brand-card p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-white">
              <ShoppingBag size={18} />
            </div>
            <h2 className="font-heading text-xl font-extrabold italic text-white">TU PEDIDO</h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="h-full overflow-y-auto p-4 pb-32 sm:pb-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-white/50">
              <ShoppingBag size={48} className="mb-4 opacity-30" />
              <p className="font-heading font-bold italic">Tu carrito está vacío</p>
              <p className="font-body text-sm">¡Agrega algunos deliciosos platos!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.nombre} className="flex items-center gap-4 rounded-lg bg-brand-card p-3 shadow-sm">
                  <div className="flex flex-1 flex-col">
                    <span className="font-heading text-sm font-bold italic text-white">{item.nombre}</span>
                    <span className="font-body text-xs text-brand-primary font-bold">S/ {(item.precio * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 rounded-lg bg-[#0a0a0a] p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.nombre, -1)}
                      className="rounded p-1 text-white hover:bg-white/10"
                    >
                      {item.quantity === 1 ? <Trash2 size={16} className="text-red-500"/> : <Minus size={16} />}
                    </button>
                    <span className="w-4 text-center font-heading text-sm font-bold text-white">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.nombre, 1)}
                      className="rounded p-1 text-white hover:bg-white/10"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-brand-card p-4">
            <div className="mb-4 flex justify-between text-white">
              <span className="font-body text-sm">Total ({itemCount} items)</span>
              <span className="font-heading text-xl font-extrabold italic text-brand-primary">S/ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-primary to-brand-primaryHover py-3.5 font-heading text-lg font-extrabold italic text-white shadow-lg shadow-brand-primary/25 transition-transform active:scale-95"
            >
              CONFIRMAR PEDIDO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;
