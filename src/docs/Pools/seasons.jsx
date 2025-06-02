import React from "react";
import { FaLayerGroup } from "react-icons/fa";

export default function Seasons() {
    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaLayerGroup className="mr-2" /> Seasons Management
                </h3>
                <p className="text-gray-300 mb-4">
                    Seasons are periods that group multiple pools or events. Managing
                    seasons allows to keep track of winners and rankings across longer
                    timespans.
                </p>

                <ul className="list-disc list-inside text-gray-300 space-y-4">
                    <li>
                        <strong>Finish a Season:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">!finishseason &lt;seasonName&gt;</code>
                        </strong>{" "}
                        — Ends the current season, saves the winner and season name.
                        <blockquote className="mt-3 ml-6 border-l-4 border-purple-600 bg-purple-900/20 p-3 rounded text-purple-300">
                            Example:
                            <br />
                            <code>!finishseason Summer2025</code> closes the "Summer2025" season
                            and records the winner.
                        </blockquote>
                    </li>

                    <li>
                        <strong>View Seasons:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">!seasons</code>
                        </strong>{" "}
                        — Displays the list of winners for all seasons recorded in the
                        server.
                        <blockquote className="mt-3 ml-6 border-l-4 border-teal-600 bg-teal-900/20 p-3 rounded text-teal-200">
                            Example:
                            <br />
                            <code>!seasons</code> shows the history of all past seasons and
                            their winners.
                        </blockquote>
                    </li>
                </ul>
            </section>
        </div>
    );
}
