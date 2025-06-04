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
                    Seasons group multiple pools over time, helping track rankings and winners across different competitive periods.
                </p>

                <ul className="list-disc list-inside text-gray-300 space-y-4">
                    <li>
                        <strong>Finish a Season:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?finishseason</code>
                        </strong>{" "}
                        — Ends the current active season, registers the winner and begins a new one automatically.
                        <blockquote className="mt-3 ml-6 border-l-4 border-purple-600 bg-purple-900/20 p-3 rounded text-purple-300">
                            Example:
                            <br />
                            <code>?finishseason</code> will close the current season (e.g., <em>global</em>) and start a new one (e.g., <em>global2</em>).
                        </blockquote>
                    </li>

                    <li>
                        <strong>View Past Seasons:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?seasons</code>
                        </strong>{" "}
                        — Displays a list of all past seasons and their winners.
                        <blockquote className="mt-3 ml-6 border-l-4 border-teal-600 bg-teal-900/20 p-3 rounded text-teal-200">
                            Example:
                            <br />
                            <code>?seasons</code> shows a history of every recorded season and the top player of each.
                        </blockquote>
                    </li>

                    <li>
                        <strong>Global Ranking:</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">?global</code>
                        </strong>{" "}
                        — Shows the total points accumulated by each user across all seasons.
                        <blockquote className="mt-3 ml-6 border-l-4 border-blue-600 bg-blue-900/20 p-3 rounded text-blue-200">
                            Example:
                            <br />
                            <code>?global</code> displays the all-time leaderboard combining all season scores.
                        </blockquote>
                    </li>
                </ul>
            </section>
        </div>
    );
}
