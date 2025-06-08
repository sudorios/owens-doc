import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function CreateRate() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaStar className="mr-2" /> {t('docs.rate.create_rate.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                    {t('docs.rate.create_rate.description')}
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>{t('docs.rate.create_rate.features.engagement')}</li>
                    <li>{t('docs.rate.create_rate.features.ratings')}</li>
                    <li>{t('docs.rate.create_rate.features.feedback')}</li>
                </ul>
            </section>
        </div>
    );
}
