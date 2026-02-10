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
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sheet Content */}
      <div className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-zinc-900 shadow-2xl ring-1 ring-white/10 transition-transform duration-300 sm:max-w-md sm:rounded-[2rem]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white shadow-lg shadow-brand-primary/20">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-extrabold italic text-white tracking-wide">TU PEDIDO</h2>
              <p className="text-xs text-gray-400 font-medium">Pollito con Papas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center text-gray-500">
              <div className="mb-4 rounded-full bg-white/5 p-6">
                <ShoppingBag size={32} className="opacity-50" />
              </div>
              <p className="font-heading text-lg font-bold italic text-white mb-2">Tu carrito está vacío</p>
              <p className="font-body text-sm max-w-[200px]">¡Explora nuestra carta y agrega tus platos favoritos!</p>
            </div>
          ) : (
            <ul className="space-y-4 pb-24 sm:pb-4">
              {items.map((item) => (
                <li key={item.nombre} className="flex items-start gap-4 rounded-2xl bg-black/20 p-4 border border-white/5">
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="font-heading text-sm font-bold italic text-white leading-tight">{item.nombre}</span>
                    <span className="font-body text-xs font-bold text-brand-primary">S/ {(item.precio * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-black/40 p-1 border border-white/5">
                    <button
                      onClick={() => onUpdateQuantity(item.nombre, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                      {item.quantity === 1 ? <Trash2 size={14} className="text-brand-primary" /> : <Minus size={14} />}
                    </button>
                    <span className="w-4 text-center font-heading text-sm font-bold text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.nombre, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="border-t border-white/5 bg-zinc-900/95 p-6 backdrop-blur-md pb-8 sm:pb-6">
            <div className="mb-6 flex justify-between items-end text-white">
              <span className="font-body text-sm text-gray-400 font-medium">Total ({itemCount} productos)</span>
              <span className="font-heading text-2xl font-extrabold italic text-brand-primary drop-shadow-sm">S/ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-primary py-4 font-heading text-lg font-extrabold italic text-white shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary/90 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                CONFIRMAR PEDIDO
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSheet;
