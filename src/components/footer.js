export default function FooterSection() {
    return (
        <footer className="w-full bg-[#111827] border-t border-[#1E293B] py-8 px-10 text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 font-semibold text-white">Owens Bot</div>
            <nav className="space-x-8 text-gray-400">
                <a href="#features" className="hover:text-red-400 transition">Features</a>
                <a href="#commands" className="hover:text-red-400 transition">Commands</a>
                <a href="#donate" className="hover:text-red-400 transition">Donate</a>
                <a href="#contact" className="hover:text-red-400 transition">Contact</a>
            </nav>
            <div className="mt-4 sm:mt-0 text-gray-500 text-xs">&copy; 2025 Owens Bot. All rights reserved.</div>
        </footer>
    );
}
