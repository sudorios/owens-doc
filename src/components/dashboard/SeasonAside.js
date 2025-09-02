import React from 'react';

const SeasonAside = ({ 
  onCreateEvent, 
  onManageUsers,
  onViewSeason,
  onShowEvents,
  onShowWinners,
  seasonName 
}) => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col border-r border-gray-800 mt-4">
      <h2 className="text-2xl font-bold mb-6 tracking-wide">Navegación</h2>
      
      <button
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold shadow transition-colors"
        onClick={onViewSeason}
        title={`Ver puntajes de ${seasonName || 'la temporada'}`}
      >
        Ver Temporada
      </button>
      
      <button
        className="mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold shadow transition-colors"
        onClick={onShowEvents}
        title="Ver todos los eventos de la temporada"
      >
        Eventos
      </button>
      
      <button
        className="mb-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-semibold shadow transition-colors"
        onClick={onShowWinners}
        title="Ver ganadores de eventos"
      >
        Ganadores
      </button>
      
      <button
        className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold shadow transition-colors"
        onClick={onCreateEvent}
        title="Crear un nuevo evento"
      >
        + Nuevo evento
      </button>    
      <hr className="border-gray-700 my-4" />
    </aside>
  );
};

export default SeasonAside;