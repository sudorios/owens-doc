import { Link } from 'react-router-dom';
import { FaDiscord, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import owensIcon from '../assets/images/owens.png';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-4 md:px-8 py-4 border-b border-gray-700">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <img src={owensIcon} alt="Owens Icon" className="w-10 h-10 md:w-12 md:h-12" />
                    <span className="font-extrabold text-xl md:text-2xl">Owens-Bot</span>
                </Link>

                <button
                    onClick={toggleMenu}
                    className="md:hidden text-2xl hover:text-red-400 transition"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className={`
                    fixed md:static top-16 left-0 w-full md:w-auto
                    bg-gray-900 md:bg-transparent
                    border-b md:border-none border-gray-700
                    ${isMenuOpen ? 'block' : 'hidden md:flex'}
                    md:flex md:items-center md:gap-6
                    p-4 md:p-0
                    transition-all duration-300 ease-in-out
                `}>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-lg font-semibold">
                        <Link
                            to="/docs"
                            className="hover:text-red-400 transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('navbar.docs')}
                        </Link>

                        <div className="flex items-center gap-4 md:gap-6">
                            <a
                                href="https://discord.com/oauth2/authorize?client_id=1372312475533316190&permissions=19327576128&integration_type=0&scope=bot"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-400 transition"
                                aria-label="Discord"
                            >
                                <FaDiscord size={24} />
                            </a>

                            <a
                                href="https://github.com/sudorios/owens-bot.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-400 transition"
                                aria-label="GitHub"
                            >
                                <FaGithub size={24} />
                            </a>

                            <div className="text-sm">
                                <select
                                    value={currentLang}
                                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                                    className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                >
                                    <option value="es">🇪🇸 Español</option>
                                    <option value="en">🇺🇸 English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}