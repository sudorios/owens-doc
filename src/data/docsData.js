import { FaDiscord, FaDownload, FaQuestionCircle, FaListUl, FaLayerGroup, FaStar } from 'react-icons/fa';

export const docsCategories = {
    "Getting Started": {
        "Installation": (
            <div className="space-y-6">
                <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                    <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                        <FaDiscord className="mr-2" /> How to Add the Bot to Your Discord Server
                    </h3>
                    <ol className="list-decimal list-inside text-gray-300 space-y-2">
                        <li>
                            Go to the bot’s invite link:
                            <a href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=PERMISSIONS" target="_blank" rel="noopener noreferrer" className="text-red-400 underline ml-1">
                                Invite Bot
                            </a>
                        </li>
                        <li>Select the server where you want to add it (requires Admin permissions).</li>
                        <li>Authorize the permissions requested for proper functionality.</li>
                        <li>Once added, type <code className="bg-[#334155] px-1 rounded">!help</code> to verify the bot is active.</li>
                    </ol>
                </section>

                <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                    <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                        <FaDownload className="mr-2" /> Manual Installation for Developers
                    </h3>
                    <ol className="list-decimal list-inside text-gray-300 space-y-2">
                        <li>Clone the repository: <code className="bg-[#334155] px-1 rounded">git clone https://github.com/sudorios/owens-bot.git</code></li>
                        <li>Install dependencies: <code className="bg-[#334155] px-1 rounded">npm install</code></li>
                        <li>Set up the <code className="bg-[#334155] px-1 rounded">.env</code> file with your token and options.</li>
                        <li>Run the bot: <code className="bg-[#334155] px-1 rounded">npm start</code></li>
                    </ol>
                </section>

                <section className="bg-[#1E293B] p-5 rounded-lg shadow-md flex items-center text-gray-400">
                    <FaQuestionCircle className="mr-3 text-red-500" size={28} />
                    <p>
                        If you have questions, use <code className="bg-[#334155] px-1 rounded">!help</code> or email me at{' '}
                        <a href="mailto:tuemail@gmail.com" className="text-red-400 underline">tuemail@gmail.com</a>.
                    </p>
                </section>
            </div>
        ),
        "Help": (
            <div className="space-y-6">
                <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                    <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                        <FaListUl className="mr-2" /> Help Command (!help)
                    </h3>
                    <p className="text-gray-300 mb-4">
                        The <code className="bg-[#334155] px-1 rounded">!help</code> command displays a list of all available commands for the bot, along with brief descriptions.
                    </p>
                    <p className="text-gray-300 mb-2">Usage:</p>
                    <pre className="bg-[#334155] p-3 rounded text-gray-200">!help</pre>
                    <p className="text-gray-300">
                        This command helps new users to get familiar with the bot's capabilities quickly without needing to read the full documentation.
                    </p>
                </section>
            </div>
        ),
    },
    "Pools": {
        "Overview": (
            <div className="space-y-6">
                <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                    <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                        <FaLayerGroup className="mr-2" /> What are Pools?
                    </h3>
                    <p className="text-gray-300 mb-4">
                        Pools are groups or contests where users can place bets on upcoming fights or matches. Each pool represents a separate competition with its own set of fights and participants.
                    </p>

                    <h4 className="text-red-400 font-semibold mb-2">How Pools Work</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Users create a pool using the <code className="bg-[#334155] px-1 rounded">!createpool &lt;name&gt;</code> command.</li>
                        <li>Fights are added to the pool with <code className="bg-[#334155] px-1 rounded">!match &lt;pool&gt; &lt;fight&gt;</code>.</li>
                        <li>Participants bet on the fights within each pool.</li>
                        <li>After fights conclude, results are set with <code className="bg-[#334155] px-1 rounded">!result &lt;messageID&gt; &lt;emoji&gt;</code>.</li>
                        <li>The pool can be finalized using <code className="bg-[#334155] px-1 rounded">!finish &lt;pool&gt;</code>, awarding points and showing rankings.</li>
                    </ul>
                </section>
            </div>
        ),
    },
    "Rate": {
        "Overview": (
            <div className="space-y-6">
                <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                    <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                        <FaStar className="mr-2" /> Rate Matches
                    </h3>
                    <p className="text-gray-300 mb-4">
                        Let users rate matches easily with Owens. Use the <code className="bg-[#334155] px-1 rounded">!rate</code> command to create polls where your community can score matches from 1 to 5 stars, and <code className="bg-[#334155] px-1 rounded">!viewrating</code> to see average ratings and votes.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Engages users by allowing them to rate matches interactively</li>
                        <li>Shows average ratings to identify fan favorites</li>
                        <li>Improves event feedback and community participation</li>
                    </ul>
                </section>
            </div>
        )
    }
};
