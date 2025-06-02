import { FaListUl } from 'react-icons/fa';

export default function Help() {
    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaListUl className="mr-2" /> Help Command (?help)
                </h3>
                <p className="text-gray-300 mb-4">
                    The <code className="bg-[#334155] px-1 rounded">?help</code> command displays a list of all available commands for the bot, along with brief descriptions.
                </p>
                <p className="text-gray-300 mb-2">Usage:</p>
                <pre className="bg-[#334155] p-3 rounded text-gray-200">?help</pre>
                <p className="text-gray-300">
                    This command helps new users to get familiar with the bot's capabilities quickly without needing to read the full documentation.
                </p>
            </section>
        </div>
    );
}
