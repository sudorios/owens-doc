import owensMatch from '../assets/images/match.png';
import owensRanking from '../assets/images/ranking.png';
import owensRate from '../assets/images/rate.png';
import { useTranslation } from 'react-i18next';

export default function FeatureSection() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#111827] text-white py-20 px-6">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-extrabold mb-12 text-center">
                    {t('features.title')}
                </h1>

                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold mb-6">{t('features.pool.title')}</h2>
                        <p className="text-gray-400 mb-6">
                            {t('features.pool.description')}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3 mb-6">
                            <li><strong>{t('features.pool.commands.createpool')}</strong></li>
                            <li><strong>{t('features.pool.commands.match')}</strong></li>
                            <li><strong>{t('features.pool.commands.result')}</strong></li>
                            <li><strong>{t('features.pool.commands.finish')}</strong></li>
                            <li><strong>{t('features.pool.commands.ranking')}</strong></li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center">
                        <img
                            src={owensMatch}
                            alt="Owens Bot Match"
                            className="max-w-[90%] max-h-96 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <div className="flex flex-col justify-center order-2 md:order-1">
                        <h2 className="text-3xl font-extrabold mb-6">{t('features.ranking.title')}</h2>
                        <p className="text-gray-400 mb-6">
                            {t('features.ranking.description')}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3">
                            <li>{t('features.ranking.features.display')}</li>
                            <li>{t('features.ranking.features.competition')}</li>
                            <li>{t('features.ranking.features.events')}</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center order-1 md:order-2">
                        <img
                            src={owensRanking}
                            alt="Owens Bot Ranking"
                            className="max-w-[90%] max-h-96 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-20">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold mb-6">{t('features.rate.title')}</h2>
                        <p className="text-gray-400 mb-6">
                            {t('features.rate.description')}
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-3">
                            <li>{t('features.rate.features.engagement')}</li>
                            <li>{t('features.rate.features.ratings')}</li>
                            <li>{t('features.rate.features.feedback')}</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-center">
                        <img
                            src={owensRate}
                            alt="Owens Bot Rate"
                            className="max-w-[90%] max-h-96 rounded-lg"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center order-2 md:order-1">
                        <h2 className="text-3xl font-extrabold mb-6">{t('features.donate.title')}</h2>
                        <p className="text-gray-400 mb-6">
                            {t('features.donate.description')}
                        </p>

                        <a
                            href="https://ko-fi.com/danniel_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#29abe0] hover:bg-[#1c7dbf] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                        >
                            {t('features.donate.button')}
                        </a>
                    </div>

                    <div className="flex items-center justify-center order-1 md:order-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
                            alt="Donate Icon"
                            className="max-w-[90%] max-h-48 rounded-lg"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
