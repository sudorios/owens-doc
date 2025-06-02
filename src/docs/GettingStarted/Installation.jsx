import { FaDiscord, FaDownload, FaQuestionCircle } from 'react-icons/fa';

export default function Installation() {
    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaDiscord className="mr-2" /> How to Add the Bot to Your Discord Server
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>
                        Go to the bot’s invite link:{" "}
                        <a
                            href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=PERMISSIONS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 underline ml-1"
                        >
                            Invite Bot
                        </a>
                    </li>
                    <li>Select the server where you want to add it (requires Admin permissions).</li>
                    <li>Authorize the permissions requested for proper functionality.</li>
                    <li>
                        Once added, type <code className="bg-[#334155] px-1 rounded">!help</code> to verify the bot is active.
                    </li>
                </ol>
            </section>

            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaDownload className="mr-2" /> Manual Installation for Developers
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>
                        Clone the repository:{" "}
                        <code className="bg-[#334155] px-1 rounded">
                            git clone https://github.com/sudorios/owens-bot.git
                        </code>
                    </li>
                    <li>
                        Install dependencies: <code className="bg-[#334155] px-1 rounded">npm install</code>
                    </li>
                    <li>
                        Set up the <code className="bg-[#334155] px-1 rounded">.env</code> file with your token and options.
                    </li>
                    <li>
                        Run the bot: <code className="bg-[#334155] px-1 rounded">npm start</code>
                    </li>
                </ol>
            </section>

            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md flex items-center text-gray-400">
                <FaQuestionCircle className="mr-3 text-red-500" size={28} />
                <p>
                    If you have questions, use <code className="bg-[#334155] px-1 rounded">!help</code> or email me at{" "}
                    <a href="mailto:tuemail@gmail.com" className="text-red-400 underline">
                        tuemail@gmail.com
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
