export default function FooterSection() {
    return (
        <footer className="bg-[#111827] text-gray-400 py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

                <div className="text-white font-extrabold text-xl">
                    Owens Bot
                </div>

                <nav className="flex space-x-6 text-sm">
                    <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
                    <a href="#commands" className="hover:text-white transition-colors duration-200">Commands</a>
                    <a href="#donate" className="hover:text-white transition-colors duration-200">Donate</a>
                    <a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a>
                </nav>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Owens Bot. All rights reserved.
            </div>
        </footer>
    );
}
