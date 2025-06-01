import { Link } from 'react-router-dom';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import owensIcon from '../assets/images/owens.png';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-8 py-4 flex items-center gap-10 border-b border-gray-700">
            <Link to="/" className="flex items-center gap-3">
                <img src={owensIcon} alt="Owens Icon" className="w-12 h-12" />
                <span className="font-extrabold text-2xl">Owens-Bot</span>
            </Link>

            <div className="ml-auto flex gap-6 text-lg font-semibold items-center">
                <Link to="/docs" className="hover:text-red-400 transition">Docs</Link>

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
            </div>
        </nav>
    );
}
