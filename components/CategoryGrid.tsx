import React from 'react';
import { MenuCategory } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryGridProps {
    categories: MenuCategory[];
    onSelectCategory: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">


            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((category, index) => (
                    <button
                        key={category.categoria}
                        onClick={() => onSelectCategory(category.categoria)}
                        className="group relative flex aspect-square flex-col overflow-hidden rounded-2xl bg-brand-card shadow-lg transition-transform active:scale-95 border border-gray-200"
                    >
                        {/* Background Image if available */}
                        {category.imagen ? (
                            <img
                                src={category.imagen}
                                alt={category.categoria}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    // Show gradient if image fails
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : null}

                        {/* Background Placeholder Gradient - Show if no image or image fails */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-80 transition-opacity group-hover:opacity-100 ${category.imagen ? 'hidden' : ''}`}></div>

                        {/* Light Overlay or none */}
                        <div className={`absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10 ${category.imagen ? 'hidden' : ''}`}></div>

                        {/* Dark Gradient Overlay for text readability if image exists */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${category.imagen ? 'block' : 'hidden'}`}></div>

                        {/* Content */}
                        <div className="relative z-10 flex h-full flex-col justify-between p-4">
                            <div className="self-end rounded-full bg-white/60 p-1.5 backdrop-blur-sm">
                                <ChevronRight size={16} className="text-gray-900" />
                            </div>

                            <div>
                                <h3 className={`font-heading text-lg font-black italic leading-tight drop-shadow-sm ${category.imagen ? 'text-white drop-shadow-md' : 'text-gray-900'}`}>
                                    {category.categoria}
                                </h3>
                                <p className={`mt-1 text-[10px] font-bold uppercase tracking-wider ${category.imagen ? 'text-gray-200' : 'text-gray-700'}`}>
                                    {category.items.length} productos
                                </p>
                            </div>
                        </div>

                        {/* Decorative pattern */}
                        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-brand-primary/10 blur-2xl transition-transform group-hover:scale-150"></div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Helper to generate some varied gradients for the placeholder
const getGradient = (index: number) => {
    const gradients = [
        'from-brand-primary to-brand-dark',
        'from-brand-accentEnd to-brand-dark',
        'from-purple-600 to-brand-dark',
        'from-blue-600 to-brand-dark',
        'from-green-600 to-brand-dark',
        'from-brand-accentStart to-brand-accentEnd',
    ];
    return gradients[index % gradients.length];
};

export default CategoryGrid;
