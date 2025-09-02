import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaDiscord } from 'react-icons/fa';

export default function ContactSection() {
    const { t } = useTranslation();

    return (
        <section className="bg-[#1a132f] text-white py-24 px-4 border-t border-gray-700 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{t('contact.title')}</h2>
                <p className="text-lg text-gray-300 mb-8">
                    {t('contact.description')}
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a
                        href="mailto:sudorios.contact@gmail.com"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition flex items-center gap-2 justify-center"
                    >
                        <FaEnvelope className="text-lg" />
                        {t('contact.email')}
                    </a>
                    <a
                        href="https://discord.gg/qn7zQmGU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white hover:border-red-500 hover:text-red-400 text-white font-semibold py-2 px-6 rounded-md transition flex items-center gap-2 justify-center"
                    >
                        <FaDiscord className="text-lg" />
                        {t('contact.discord')}
                    </a>
                </div>
            </div>
        </section>
    );
}
