import owensIcon from '../assets/owens.png';
export default function HeroSection() {
  return (
    <section className="relative bg-[#1a132f] text-white min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-purple-400 opacity-20"></div>
        <div className="absolute bottom-10 right-16 w-16 h-16 bg-purple-700 rounded-lg rotate-45 opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-purple-600 opacity-10 rotate-12"></div>
        <div className="absolute bottom-24 left-1/2 w-10 h-10 border-2 border-purple-300 rounded-full opacity-15"></div>
      </div>
      <div className="z-10 max-w-2xl">
        <img src={owensIcon} alt="Owens Bot" className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Owens Bot</h1>
        <p className="text-lg text-gray-300 mb-8">
          A Discord bot for creating pools and rating matches.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition">
            Get Started
          </button>
          <button className="border border-white hover:border-blue-500 hover:text-blue-400 text-white font-semibold py-2 px-6 rounded-md transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}