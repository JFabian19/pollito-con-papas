import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Home, UtensilsCrossed, Users } from 'lucide-react';

interface NavigationMenuProps {
    onHome: () => void;
    onMenu: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onHome, onMenu }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Close menu when clicking outside
    const handleHome = () => {
        onHome();
        setIsMenuOpen(false);
    };

    const handleMenu = () => {
        onMenu();
        setIsMenuOpen(false);
    };

    const hamburgerButton = (
        <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
            aria-label="Abrir menú"
        >
            <Menu size={24} />
        </button>
    );

    const menuDrawer = mounted ? createPortal(
        <div className="fixed inset-0 z-[100] flex">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Drawer Content */}
            <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
                <div className="flex justify-between items-center mb-8">
                    <span className="font-heading font-black italic text-xl text-brand-primary">
                        MENU
                    </span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 -mr-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleHome}
                        className="flex items-center gap-4 py-3 px-4 rounded-xl text-lg font-bold text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all text-gray-500 group-hover:text-brand-primary">
                            <Home size={20} />
                        </div>
                        Inicio
                    </button>

                    <button
                        onClick={handleMenu}
                        className="flex items-center gap-4 py-3 px-4 rounded-xl text-lg font-bold text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all text-gray-500 group-hover:text-brand-primary">
                            <UtensilsCrossed size={20} />
                        </div>
                        Carta
                    </button>

                    <button
                        onClick={() => {
                            setIsAboutOpen(true);
                            setIsMenuOpen(false); // Close main menu when opening About
                        }}
                        className="flex items-center gap-4 py-3 px-4 rounded-xl text-lg font-bold text-gray-700 hover:bg-brand-primary/5 hover:text-brand-primary transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all text-gray-500 group-hover:text-brand-primary">
                            <Users size={20} />
                        </div>
                        Quiénes Somos
                    </button>
                </div>

                {/* Footer decoration */}
                <div className="mt-auto flex flex-col items-center gap-4 opacity-40">
                    <div className="h-px w-full bg-gray-200"></div>
                    <img src="/logo.jpg" alt="Logo" className="w-20 rounded-full grayscale mix-blend-multiply" />
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Pollito con Papas
                    </p>
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    const aboutModal = mounted ? createPortal(
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop with darker opacity as requested */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={() => setIsAboutOpen(false)}
            ></div>

            {/* Modal Content - Semi-transparent black card */}
            <div className="relative w-full max-w-lg bg-black/85 text-white p-8 rounded-3xl animate-in fade-in zoom-in duration-300 border border-white/10 shadow-2xl backdrop-blur-xl">
                {/* Close Button ("X visible") */}
                <button
                    onClick={() => setIsAboutOpen(false)}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors border border-white/10"
                    aria-label="Cerrar"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col gap-6 text-center">
                    <div className="mx-auto p-3 bg-brand-primary/20 rounded-full mb-2">
                        <Users size={32} className="text-brand-primary" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-heading font-black italic text-brand-primary drop-shadow-lg leading-none">
                        QUIÉNES SOMOS
                    </h2>

                    <div className="space-y-4 font-medium text-gray-200 leading-relaxed text-sm md:text-base text-justify px-2">
                        <p>
                            Somos un perfil de cocina fusión, teniendo de embajador principal la cultura de pollo a la brasa, dando como resultado piezas mágicamente estructuradas con un sabor excepcional.
                        </p>
                        <p>
                            Nuestros insumos frescos y de alta calidad nos permiten lograr el rendimiento óptimo en cada producto presentado. Nos alienta ser los pioneros en cada pieza en carta dentro del mercado gastronómico. Nuestra característica de fast food, fusionada con la cocina criolla peruana, nos orienta a tener un valor agregado fortalecido.
                        </p>
                        <p>
                            Ser parte de pollito con papas y de la familia chicken grill and fries, es una insignia llevada con amor y respeto por lo que hacemos, por quién lo hacemos y por la satisfacción que nos retribuye hacerlo.
                        </p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <div className="h-1.5 w-16 rounded-full bg-brand-primary/80"></div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            {hamburgerButton}
            {isMenuOpen && menuDrawer}
            {isAboutOpen && aboutModal}
        </>
    );
};

export default NavigationMenu;
