import { Link } from 'react-router-dom';
import owensIcon from '../assets/owens.png';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-8 py-4 flex items-center gap-10 border-b border-gray-700 ">
            <Link to="/" className="flex items-center gap-3">
                <img src={owensIcon} alt="Owens Icon" className="w-12 h-12" />
                <span className="font-extrabold text-2xl">Owens-Bot</span>
            </Link>
            <div className="ml-auto flex gap-8 text-lg font-semibold">
                <Link to="/commands">Docs</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/faq">Invite</Link>
            </div>
        </nav>
    );
}
