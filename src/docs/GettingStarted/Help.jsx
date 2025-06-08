import { FaListUl } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Help() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaListUl className="mr-2" /> {t('docs.getting_started.help.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                    {t('docs.getting_started.help.description')}
                </p>
                <p className="text-gray-300 mb-2">{t('docs.getting_started.help.usage')}</p>
                <pre className="bg-[#334155] p-3 rounded text-gray-200">?help</pre>
                <p className="text-gray-300">
                    {t('docs.getting_started.help.additional_info')}
                </p>
            </section>
        </div>
    );
}
