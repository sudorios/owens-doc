import React, { useState } from 'react';

const secciones = {
    'Inicio': 'Bienvenido a la documentación de tu bot. Aquí aprenderás a usar todos los comandos.',
    'Crear Quiniela': 'Comando: !createpool <name> — Crea una quiniela para apostar combates.',
    'Combate': 'Comando: !match <pool> <fight> — Publica un combate para que los usuarios apuesten.',
    'Resultado': 'Comando: !result <messageID> <emoji> — Define el emoji ganador del combate.',
    'Finalizar': 'Comando: !finish <pool> — Finaliza la quiniela, otorga puntos y muestra ranking.',
    'Ranking': 'Comando: !ranking — Muestra el ranking global del servidor.',
    'Ayuda': 'Comando: !help — Muestra todos los comandos disponibles.',
    'Calificar': 'Comando: !rate <match name> — Permite calificar un combate de 1 a 5 estrellas.',
    'Ver Calificaciones': 'Comando: !viewrating — Muestra el promedio y cantidad de votos.',
    'Donar': 'Comando: !donate — Muestra opciones para apoyar el desarrollo del bot.',
    'Estado de Pools': 'Comando: !poolstatus — Lista de quinielas creadas en el servidor.'
};

export default function Docs() {
    const [activo, setActivo] = useState('Inicio');

    return (
        <div className="flex h-screen font-sans mt-8 bg-[#0F172A] text-white">
            {/* Panel lateral */}
            <aside className="w-64 bg-[#0F172A] border-r border-[#1E293B] p-6 overflow-y-auto mt-12">
                <h2 className="text-xs font-semibold text-gray-400 tracking-widest mb-4 uppercase">
                    Getting Started
                </h2>
                <ul className="space-y-2">
                    {Object.keys(secciones).map((titulo) => (
                        <li key={titulo}>
                            <button
                                onClick={() => setActivo(titulo)}
                                className={`w-full text-left px-4 py-2 rounded transition-all ${activo === titulo
                                        ? 'bg-red-500 text-white font-semibold'
                                        : 'hover:bg-red-200 text-gray-300 hover:text-gray-900'
                                    }`}
                            >
                                {titulo}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Panel principal */}
            <main className="flex-1 p-10 overflow-y-auto mt-12">
                <h1 className="text-3xl font-bold mb-4 text-red-400">{activo}</h1>
                <p className="text-gray-200 text-lg">{secciones[activo]}</p>
            </main>
        </div>
    );
}
