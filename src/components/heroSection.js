import owensIcon from '../assets/owens.png';
export default function HeroSection() {
  return (
    <section className="relative bg-[#1a132f] text-white py-32 flex flex-col items-center justify-center text-center px-4  border-b border-gray-700">
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