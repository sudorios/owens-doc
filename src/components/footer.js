import { useTranslation } from 'react-i18next';

export default function FooterSection() {
    const { t } = useTranslation();

    return (
        <footer className="w-full bg-[#111827] border-t border-[#1E293B] py-8 px-10 text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 font-semibold text-white">Owens Bot</div>
            <nav className="space-x-8 text-gray-400">
                <a href="#features" className="hover:text-red-400 transition">{t('footer.features')}</a>
                <a href="#commands" className="hover:text-red-400 transition">{t('footer.commands')}</a>
                <a href="#donate" className="hover:text-red-400 transition">{t('footer.donate')}</a>
                <a href="#contact" className="hover:text-red-400 transition">{t('footer.contact')}</a>
            </nav>
            <div className="mt-4 sm:mt-0 text-gray-500 text-xs">{t('footer.copyright')}</div>
        </footer>
    );
}
