import { FaDiscord, FaDownload, FaQuestionCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Installation() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaDiscord className="mr-2" /> {t('docs.getting_started.installation.title')}
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>
                        {t('docs.getting_started.installation.steps.1')}{" "}
                        <a
                            href="https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&scope=bot&permissions=PERMISSIONS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 underline ml-1"
                        >
                            Invite Bot
                        </a>
                    </li>
                    <li>{t('docs.getting_started.installation.steps.2')}</li>
                    <li>{t('docs.getting_started.installation.steps.3')}</li>
                    <li>
                        {t('docs.getting_started.installation.steps.4')}
                    </li>
                </ol>
            </section>

            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-red-400">
                    <FaDownload className="mr-2" /> {t('docs.getting_started.installation.manual_installation.title')}
                </h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    <li>
                        {t('docs.getting_started.installation.manual_installation.steps.1')}{" "}
                        <code className="bg-[#334155] px-1 rounded">
                            git clone https://github.com/sudorios/owens-bot.git
                        </code>
                    </li>
                    <li>
                        {t('docs.getting_started.installation.manual_installation.steps.2')}{" "}
                        <code className="bg-[#334155] px-1 rounded">npm install</code>
                    </li>
                    <li>
                        {t('docs.getting_started.installation.manual_installation.steps.3')}
                    </li>
                    <li>
                        {t('docs.getting_started.installation.manual_installation.steps.4')}{" "}
                        <code className="bg-[#334155] px-1 rounded">npm start</code>
                    </li>
                </ol>
            </section>

            <section className="bg-[#1E293B] p-5 rounded-lg shadow-md flex items-center text-gray-400">
                <FaQuestionCircle className="mr-3 text-red-500" size={28} />
                <p>
                    {t('docs.getting_started.installation.support.text')}{" "}
                    <a href="mailto:sudorios.contact@gmail.com" className="text-red-400 underline">
                        sudorios.contact@gmail.com
                    </a>
                    .
                </p>
            </section>
        </div>
    );
}
