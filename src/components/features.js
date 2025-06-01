import owensMatch from '../assets/images/match.png';
import owensRanking from '../assets/images/ranking.png';
import owensRate from '../assets/images/rate.png';

export default function FeatureSection() {
    return (
        <section className="bg-[#111827] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-extrabold mb-12 text-center">
                    Why Choose Owens?
                </h1>

                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold mb-6">Pool</h2>
                        <p className="text-gray-400 mb-6">
                            Create and manage betting pools easily with Owens. Here are some key commands to handle your pools and events on your Discord server:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3 mb-6">
                            <li><strong>!createpool &lt;name&gt;</strong>: Creates a new betting pool for the server.</li>
                            <li><strong>!match &lt;pool&gt; &lt;fight&gt;</strong>: Posts a match for users to bet on using emojis.</li>
                            <li><strong>!result &lt;messageID&gt; &lt;emoji&gt;</strong>: Sets the winning emoji for the match.</li>
                            <li><strong>!finish &lt;pool&gt;</strong>: Finishes the betting pool, assigns points, and shows event rankings.</li>
                            <li><strong>!ranking</strong>: Shows the global ranking for the current server.</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center">
                        <img
                            src={owensMatch}
                            alt="Owens Bot Match"
                            className="max-w-[90%] max-h-96 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <div className="flex flex-col justify-center order-2 md:order-1">
                        <h2 className="text-3xl font-extrabold mb-6">Ranking</h2>
                        <p className="text-gray-400 mb-6">
                            Keep track of the competition with Owens’ ranking system. Use the <code>!ranking</code> command to view the global standings in your server and see who’s leading the game.
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3">
                            <li>Displays updated global rankings automatically</li>
                            <li>Helps increase competitiveness and engagement</li>
                            <li>Supports multiple simultaneous events</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center order-1 md:order-2">
                        <img
                            src={owensRanking}
                            alt="Owens Bot Ranking"
                            className="max-w-[90%] max-h-96 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold mb-6">Rate</h2>
                        <p className="text-gray-400 mb-6">
                            Let users rate matches easily with Owens. Use the <code>!rate</code> command to create polls where your community can score matches from 1 to 5 stars, and <code>!viewrating</code> to see average ratings and votes.
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3">
                            <li>Engages users by allowing them to rate matches interactively</li>
                            <li>Shows average ratings to identify fan favorites</li>
                            <li>Improves event feedback and community participation</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center">
                        <img
                            src={owensRate}
                            alt="Owens Bot Rate"
                            className="max-w-[90%] max-h-96 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center order-2 md:order-1">
                        <h2 className="text-3xl font-extrabold mb-6">Donate</h2>
                        <p className="text-gray-400 mb-6">
                            Support the continuous development of Owens! Use the <code>!donate</code> command to see donation options or click the button below to contribute directly via Ko-fi.
                        </p>

                        <a
                            href="https://ko-fi.com/danniel_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#29abe0] hover:bg-[#1c7dbf] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            Support us on Ko-fi
                        </a>
                    </div>

                    <div className="flex items-center justify-center order-1 md:order-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
                            alt="Donate Icon"
                            className="max-w-[90%] max-h-48 rounded-lg"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
