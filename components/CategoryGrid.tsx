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
                        className="group relative flex aspect-square flex-col overflow-hidden rounded-2xl bg-brand-card shadow-lg transition-transform active:scale-95 border border-white/5"
                    >
                        {/* Background Placeholder Gradient - In a real app, this would be category.image */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-80 transition-opacity group-hover:opacity-100`}></div>

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30"></div>

                        {/* Content */}
                        <div className="relative z-10 flex h-full flex-col justify-between p-4">
                            <div className="self-end rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                                <ChevronRight size={16} className="text-white" />
                            </div>

                            <div>
                                <h3 className="font-heading text-lg font-black italic leading-tight text-white drop-shadow-md">
                                    {category.categoria}
                                </h3>
                                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
                                    {category.items.length} productos
                                </p>
                            </div>
                        </div>

                        {/* Decorative pattern */}
                        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-transform group-hover:scale-150"></div>
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
