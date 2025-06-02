import { useState } from 'react';
import { docsCategories } from '../docs/docsData.js';
import FooterSection from '../components/footer';

export default function Docs() {
    const categorias = Object.keys(docsCategories);
    const [categoriaActiva, setCategoriaActiva] = useState(categorias[0]);
    const [seccionActiva, setSeccionActiva] = useState(Object.keys(docsCategories[categorias[0]])[0]);

    return (
        <>
            <div className="flex min-h-screen font-sans mt-8 bg-[#0F172A] text-white">
                {/* Panel lateral categorías */}
                <aside className="w-64 bg-[#0F172A] border-r border-[#1E293B] p-6 mt-12 text-gray-300">
                    {categorias.map((cat) => (
                        <div key={cat} className="mb-8">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">{cat}</h3>
                            <ul className="space-y-1">
                                {Object.keys(docsCategories[cat]).map((secc) => (
                                    <li key={secc}>
                                        <button
                                            onClick={() => {
                                                setCategoriaActiva(cat);
                                                setSeccionActiva(secc);
                                            }}
                                            className={`w-full text-left px-3 py-1 rounded transition-all ${categoriaActiva === cat && seccionActiva === secc
                                                ? 'bg-red-500 text-white font-semibold'
                                                : 'hover:bg-red-200 hover:text-gray-900'
                                                }`}
                                        >
                                            {secc}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>
                {/* Panel principal */}
                <main className="flex-1 p-10 mt-12 flex flex-col">
                    <h1 className="text-3xl font-bold mb-4 text-red-400">{seccionActiva}</h1>
                    <div className="text-gray-200 text-lg flex-grow mb-8">
                        {docsCategories[categoriaActiva][seccionActiva]}
                    </div>
                    <FooterSection />
                </main>
            </div>
        </>
    );
}
