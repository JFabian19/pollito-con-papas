import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface ProductCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onAdd, index }) => {


  return (
    <div className="group relative rounded-xl p-[1px] solar-gradient-border transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,221,85,0.3)]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-brand-card">
        {/* Image Container */}
        <div className="relative h-40 w-full overflow-hidden">
          {item.imagen ? (
            <img
              src={item.imagen}
              alt={item.nombre}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`flex h-full w-full items-center justify-center bg-gray-100 ${item.imagen ? 'hidden' : ''}`}>
            <span className="font-heading text-2xl font-bold italic text-gray-300">Pollito</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-extrabold italic leading-tight text-gray-900 whitespace-pre-line">
              {item.nombre}
            </h3>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-brand-primary/20 px-2 py-1 text-sm font-bold text-brand-primary">
              S/ {item.precio.toFixed(2)}
            </span>
          </div>

          <p className="mb-4 flex-1 font-body text-sm text-gray-600 line-clamp-3">
            {item.descripcion}
          </p>

          <button
            onClick={() => onAdd(item)}
            className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 font-heading font-bold italic text-white transition-colors hover:bg-brand-primaryHover active:scale-95"
          >
            <Plus size={18} />
            AGREGAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
