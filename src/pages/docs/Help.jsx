import { useTranslation } from 'react-i18next';

export default function Help() {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-3xl font-bold mb-4 text-red-400">{t('docs.help.title')}</h1>
            <div className="text-gray-200 text-lg flex-grow mb-8">
                <p className="mb-4">{t('docs.help.content')}</p>
                {/* Aquí puedes agregar más contenido específico de la ayuda */}
            </div>
        </>
    );
} 