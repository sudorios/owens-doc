export default function FeatureSection() {
    return (
        <section className="bg-[#111827] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="text-3xl font-extrabold mb-6">Why Choose Owens?</h2>
                    <p className="text-gray-400 mb-6">
                        Owens is designed for Discord communities that love prediction games, wrestling leagues, and interactive combat events. Whether you're hosting a fantasy tournament or casual matches with friends, Owens helps you create dynamic pools and score fights with ease.
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Rate matches like Cagematch with custom scoring logic</li>
                        <li>Create prediction pools in just a few clicks</li>
                        <li>Live results and automatic ranking updates</li>
                        <li>Manage multiple events simultaneously</li>
                        <li>Fully integrated with any Discord server channel</li>
                        <li>Clean and interactive bot responses for better engagement</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
