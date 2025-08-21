const SeasonAside = ({ 
  events, 
  loadingEvents, 
  onCreateEvent, 
  onSelectEvent, 
  onManageUsers,
  onViewSeason,
  seasonName 
}) => (
  <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col border-r border-gray-800 mt-4">
    <h2 className="text-2xl font-bold mb-6 tracking-wide">Eventos</h2>
    
    <button
      className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold shadow transition-colors"
      onClick={onViewSeason}
      title={`Ver puntajes de ${seasonName || 'la temporada'}`}
    >
      Ver Temporada
    </button>
    
    <button
      className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold shadow"
      onClick={onCreateEvent}
    >
      + Nuevo evento
    </button>
    
    <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">
      Lista de eventos
    </p>
    
    <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-14rem)] pr-2 mb-6">
      {loadingEvents ? (
        <span className="text-gray-400">Cargando eventos...</span>
      ) : events.length === 0 ? (
        <span className="text-gray-400">No hay eventos.</span>
      ) : (
        events.map((event) => (
          <span
            key={event.id}
            className="font-mono text-base truncate px-3 py-2 rounded-lg bg-gray-800 transition-all duration-200 cursor-pointer hover:bg-gray-700 hover:shadow-md hover:translate-x-1"
            title={event.name}
            onClick={() => onSelectEvent(event.id)}
          >
            {event.name}
          </span>
        ))
      )}
    </nav>
    
    <hr className="border-gray-700 my-4" />
    
    <button
      className="mt-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold shadow"
      onClick={onManageUsers}
    >
      Usuarios
    </button>
  </aside>
);

export default SeasonAside;