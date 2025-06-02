import { FaLayerGroup } from "react-icons/fa";

export default function CreatePools() {
    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaLayerGroup className="mr-2" /> What are Pools?
                </h3>
                <p className="text-gray-300 mb-4">
                    Pools are groups or contests where users place bets on upcoming fights
                    or matches. Each pool acts as an independent competition with its own
                    fights and participants.
                </p>

                <h4 className="text-red-400 font-semibold mb-2">How Pools Work</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-4">
                    <li>
                        <strong>Create a Pool:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?createpool &lt;name&gt;</code>
                        </strong>{" "}
                        — This command initializes a new pool with the given name.
                        <blockquote className="mt-3 ml-6 border-l-4 border-blue-600 bg-blue-900/20 p-3 rounded text-blue-200">
                            Example:
                            <br />
                            <code>?createpool SummerBrawl2025</code> creates a pool named
                            "SummerBrawl2025" where fights can be added and bets placed.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Add Matches:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?match &lt;pool&gt; &lt;fight&gt;</code>
                        </strong>{" "}
                        — Use this command to add fights to a specific pool.
                        <blockquote className="mt-3 ml-6 border-l-4 border-green-600 bg-green-900/20 p-3 rounded text-green-200">
                            Example:
                            <br />
                            <code>?match SummerBrawl2025 Fight1</code> adds a fight named
                            "Fight1" to the "SummerBrawl2025" pool.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Place Bets:</strong>{" "}
                        Participants place bets on individual fights within a pool by
                        selecting their predicted winner.
                        <blockquote className="mt-3 ml-6 border-l-4 border-yellow-600 bg-yellow-900/20 p-3 rounded text-yellow-300">
                            Bets count towards the participant's total points once results are
                            finalized.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Set Results:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?result &lt;messageID&gt; &lt;emoji&gt;</code>
                        </strong>{" "}
                        — After a fight finishes, use this command to set the official result.
                        <blockquote className="mt-3 ml-6 border-l-4 border-pink-600 bg-pink-900/20 p-3 rounded text-pink-300">
                            Example:
                            <br />
                            <code>?result 123456789 👍</code> marks the fighter associated with
                            the 👍 emoji as the winner.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Finish the Pool:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?finish &lt;pool&gt;</code>
                        </strong>{" "}
                        — Ends the pool, calculates points, and shows final rankings.
                        <blockquote className="mt-3 ml-6 border-l-4 border-purple-600 bg-purple-900/20 p-3 rounded text-purple-300">
                            Use this once all fights have results and no more bets will be
                            accepted.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Check Pool Status:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?poolstatus</code>
                        </strong>{" "}
                        — Displays the current status of the pools.
                        <blockquote className="mt-3 ml-6 border-l-4 border-teal-600 bg-teal-900/20 p-3 rounded text-teal-200">
                            Example:
                            <br />
                            <code>?poolstatus</code> shows the live status and details.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Show Rankings:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?ranking</code>
                        </strong>{" "}
                        — Displays the global ranking for the current season.
                        <blockquote className="mt-3 ml-6 border-l-4 border-orange-600 bg-orange-900/20 p-3 rounded text-orange-300">
                            Example:
                            <br />
                            <code>!ranking</code> shows the ranking of all participants from
                            the current season.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Show Global Ranking:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?rankinglobal</code>
                        </strong>{" "}
                        — Displays the global ranking across all seasons.
                        <blockquote className="mt-3 ml-6 border-l-4 border-orange-600 bg-orange-900/20 p-3 rounded text-orange-300">
                            Example:
                            <br />
                            <code>!rankinglobal</code> shows the overall leaderboard combining
                            all seasons.
                        </blockquote>
                    </li>
                </ul>
            </section>
        </div>
    );
}
