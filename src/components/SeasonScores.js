const SeasonScores = ({
  guildName,
  seasonName,
  eventScore,
  loadingEventScore,
  onShowUsers,
  onShowAddUser
}) => (
  <main className="flex-1 p-10 text-white mt-20">
    <div className="bg-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:gap-12">
        <div>
          <div className="text-gray-400 font-semibold uppercase text-xs">Temporada</div>
          <div className="text-2xl font-extrabold text-blue-400 tracking-tight uppercase">
            {seasonName || "Nombre de la Season"}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="text-gray-400 font-semibold uppercase text-xs">Servidor</div>
          <div className="text-xl font-bold text-blue-300 tracking-tight uppercase">
            {guildName || "Nombre del Guild"}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6 md:mt-0">
        <button
          className="px-4 py-2 bg-blue-700 hover:bg-blue-800 transition text-white rounded-lg font-semibold shadow-md"
          onClick={onShowUsers}
        >
          Usuarios
        </button>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold shadow-md"
          onClick={onShowAddUser}
        >
          + Usuario
        </button>
      </div>
    </div>
    <h2 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2">
    Historial de Puntajes
    </h2>
    {loadingEventScore ? (
      <p className="text-gray-400">Cargando puntajes del evento...</p>
    ) : eventScore.length === 0 ? (
      <p className="text-gray-400">No hay puntajes para este evento.</p>
    ) : (
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">ID</th>
              <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Usuario</th>
              <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {eventScore.map((score, i) => (
              <tr
                key={score.id}
                className={`${
                  i % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                } hover:bg-gray-600 transition`}
              >
                <td className="px-4 py-2 text-gray-200 font-medium">{score.id}</td>
                <td className="px-4 py-2 text-gray-100">
                  {score.user?.username || "Desconocido"}
                </td>
                <td className="px-4 py-2 text-blue-400 font-bold">{score.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </main>
);

export default SeasonScores;
