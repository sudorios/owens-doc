import { Outlet, Link, useLocation } from 'react-router-dom';
import { docsCategories } from '../docs/docsData.js';
import FooterSection from '../components/footer';

const toSlug = (text) =>
    text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');

export default function Docs() {
    const categorias = Object.keys(docsCategories);
    const location = useLocation();

    return (
        <>
            <div className="flex min-h-screen font-sans mt-8 bg-[#0F172A] text-white">
                <aside className="w-64 bg-[#0F172A] border-r border-[#1E293B] p-6 mt-12 text-gray-300">
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
                <main className="flex-1 p-10 mt-12 flex flex-col">
                    <Outlet />
                    <FooterSection />
                </main>
            </div>
        </>
    );
}
