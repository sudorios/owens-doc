import { Outlet, Link, useLocation } from 'react-router-dom';
import { docsCategories } from '../docs/docsData.js';
import FooterSection from '../components/footer';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const toSlug = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');

const getTitleFromPath = (path) => {
    const pathParts = path.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

export default function Docs() {
    const categorias = Object.keys(docsCategories);
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const currentTitle = getTitleFromPath(location.pathname);

    return (
        <>
            <div className="flex min-h-screen font-sans mt-8 bg-[#0F172A] text-white">
                <aside className="hidden md:block w-64 bg-[#0F172A] border-r border-[#1E293B] p-6 mt-12 text-gray-300">
                    {categorias.map((cat) => (
                        <div key={cat} className="mb-8">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{cat}</h3>
                            <ul className="space-y-1">
                                {Object.keys(docsCategories[cat]).map((secc) => (
                                    <li key={secc}>
                                        <Link
                                            to={`/docs/${toSlug(secc)}`}
                                            className={`w-full text-left px-3 py-1 rounded transition-all block ${location.pathname === `/docs/${toSlug(secc)}`
                                                ? 'bg-red-500 text-white font-semibold'
                                                : 'hover:bg-red-200 hover:text-gray-900'
                                                }`}
                                        >
                                            {secc}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {drawerOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            style={{ top: '64px' }} // Ajustamos el overlay para que comience después del navbar
                            onClick={() => setDrawerOpen(false)}
                        />
                        <aside className="fixed top-6 left-0 h-full w-64 bg-[#0F172A] border-r border-[#1E293B] p-6 mt-12 text-gray-300 z-50 md:hidden">
                            <button
                                className="absolute top-4 right-4"
                                onClick={() => setDrawerOpen(false)}
                                aria-label="Cerrar menú"
                            >
                                <FaTimes size={24} />
                            </button>
                            {categorias.map((cat) => (
                                <div key={cat} className="mb-8">
                                    <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{cat}</h3>
                                    <ul className="space-y-1">
                                        {Object.keys(docsCategories[cat]).map((secc) => (
                                            <li key={secc}>
                                                <Link
                                                    to={`/docs/${toSlug(secc)}`}
                                                    className={`w-full text-left px-3 py-1 rounded transition-all block ${location.pathname === `/docs/${toSlug(secc)}`
                                                        ? 'bg-red-500 text-white font-semibold'
                                                        : 'hover:bg-red-200 hover:text-gray-900'
                                                        }`}
                                                    onClick={() => setDrawerOpen(false)}
                                                >
                                                    {secc}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </aside>
                    </>
                )}

                <main className="flex-1 p-4 md:p-10 mt-12 flex flex-col">
                    <div className="bg-[#1E293B] md:hidden mb-6 flex items-center gap-4 p-2 rounded-lg ">
                        <button
                            className="hover:bg-[#2d3a4f] transition-colors"
                            onClick={() => setDrawerOpen(true)}
                            aria-label="Abrir menú"
                        >
                            <FaBars size={24} />
                        </button>
                        <h1 className="text-2xl font-bold text-white">
                            {currentTitle || 'Documentation'}
                        </h1>
                    </div>
                    <Outlet />
                    <FooterSection />
                </main>
            </div>
        </>
    );
}