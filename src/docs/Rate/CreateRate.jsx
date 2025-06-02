import { FaStar } from "react-icons/fa";

export default function CreateRate() {
    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaStar className="mr-2" /> Rate Matches
                </h3>
                <p className="text-gray-300 mb-4">
                    Let users rate matches easily with Owens. Use the{" "}
                    <code className="bg-[#334155] px-1 rounded">?rate</code> command to
                    create polls where your community can score matches from 1 to 5 stars,
                    and <code className="bg-[#334155] px-1 rounded">?viewrating</code> to
                    see average ratings and votes.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Engages users by allowing them to rate matches interactively</li>
                    <li>Shows average ratings to identify fan favorites</li>
                    <li>Improves event feedback and community participation</li>
                </ul>
            </section>
        </div>
    );
}
