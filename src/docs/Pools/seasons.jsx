import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Seasons() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaLayerGroup className="mr-2" /> {t('docs.pools.seasons.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                    {t('docs.pools.seasons.description')}
                </p>

                <ul className="list-disc list-inside text-gray-300 space-y-4">
                    <li>
                        <strong>{t('docs.pools.seasons.commands.finish_season.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.seasons.commands.finish_season.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.seasons.commands.finish_season.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-purple-600 bg-purple-900/20 p-3 rounded text-purple-300">
                            {t('docs.pools.seasons.commands.finish_season.example.title')}
                            <br />
                            <code>{t('docs.pools.seasons.commands.finish_season.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.seasons.commands.view_past.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.seasons.commands.view_past.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.seasons.commands.view_past.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-teal-600 bg-teal-900/20 p-3 rounded text-teal-200">
                            {t('docs.pools.seasons.commands.view_past.example.title')}
                            <br />
                            <code>{t('docs.pools.seasons.commands.view_past.example.text')}</code>
                        </blockquote>
                    </li>

                    <li>
                        <strong>{t('docs.pools.seasons.commands.global_ranking.title')}</strong>{" "}
                        <strong>
                            <code className="bg-[#334155] px-1 rounded">{t('docs.pools.seasons.commands.global_ranking.command')}</code>
                        </strong>{" "}
                        — {t('docs.pools.seasons.commands.global_ranking.description')}
                        <blockquote className="mt-3 ml-6 border-l-4 border-blue-600 bg-blue-900/20 p-3 rounded text-blue-200">
                            {t('docs.pools.seasons.commands.global_ranking.example.title')}
                            <br />
                            <code>{t('docs.pools.seasons.commands.global_ranking.example.text')}</code>
                        </blockquote>
                    </li>
                </ul>
            </section>
        </div>
    );
}
