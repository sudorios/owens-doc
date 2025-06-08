import { FaLayerGroup } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function CreatePools() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaLayerGroup className="mr-2" /> {t('docs.pools.create_pools.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                    {t('docs.pools.create_pools.description')}
                </p>

                <h4 className="text-red-400 font-semibold mb-2">{t('docs.pools.create_pools.how_it_works')}</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-4">
                    <li>
                        <strong>{t('docs.pools.create_pools.steps.create.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.create.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.create.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-blue-600 bg-blue-900/20 p-3 rounded text-blue-200">
                            {t('docs.pools.create_pools.steps.create.example.title')}
                            <br />
                            <code>{t('docs.pools.create_pools.steps.create.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.add_matches.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.add_matches.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.add_matches.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-green-600 bg-green-900/20 p-3 rounded text-green-200">
                            {t('docs.pools.create_pools.steps.add_matches.example.title')}
                            <br />
                            <code>{t('docs.pools.create_pools.steps.add_matches.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.place_bets.title')}</strong>{" "}
                        {t('docs.pools.create_pools.steps.place_bets.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-yellow-600 bg-yellow-900/20 p-3 rounded text-yellow-300">
                            {t('docs.pools.create_pools.steps.place_bets.note')}
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.set_results.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.set_results.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.set_results.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-pink-600 bg-pink-900/20 p-3 rounded text-pink-300">
                            {t('docs.pools.create_pools.steps.set_results.example.title')}
                            <br />
                            <code>{t('docs.pools.create_pools.steps.set_results.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.finish.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.finish.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.finish.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-purple-600 bg-purple-900/20 p-3 rounded text-purple-300">
                            {t('docs.pools.create_pools.steps.finish.note')}
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.check_status.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.check_status.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.check_status.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-teal-600 bg-teal-900/20 p-3 rounded text-teal-200">
                            {t('docs.pools.create_pools.steps.check_status.example.title')}
                            <br />
                            <code>{t('docs.pools.create_pools.steps.check_status.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.show_rankings.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.show_rankings.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.show_rankings.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-orange-600 bg-orange-900/20 p-3 rounded text-orange-300">
                            {t('docs.pools.create_pools.steps.show_rankings.example.title')}
                            <br />
                            <code>{t('docs.pools.create_pools.steps.show_rankings.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.create_pools.steps.show_global.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.create_pools.steps.show_global.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.create_pools.steps.show_global.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-orange-600 bg-orange-900/20 p-3 rounded text-orange-300">
                            {t('docs.pools.create_pools.steps.show_global.example.title')}
                            <br />
                            <code>{t('docs.pools.create_pools.steps.show_global.example.text')}</code>
                        </blockquote>
                    </li>
                </ul>
            </section>
        </div>
    );
}
