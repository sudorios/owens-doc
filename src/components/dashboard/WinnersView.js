import React, { useState, useEffect } from 'react';
import { getEventWinners } from '../../services/eventWinner';

const WinnersView = ({ 
  guildId,  
  onBack, 
  seasonName 
}) => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        setError(null);

        const eventWinners = await getEventWinners(guildId);

        const sortedWinners = eventWinners.sort((a, b) => {
          const pointsDiff = (b.points || b.totalPoints || 0) - (a.points || a.totalPoints || 0);
          if (pointsDiff !== 0) return pointsDiff;

          const dateA = new Date(a.eventDate || 0);
          const dateB = new Date(b.eventDate || 0);
          return dateB - dateA;
        });

        setWinners(sortedWinners);
      } catch (err) {
        console.error("Error cargando ganadores:", err);
        setError("Error al cargar los ganadores");
      } finally {
        setLoading(false);
      }
    };

    if (guildId) {
      fetchWinners();
    }
  }, [guildId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
        <span className="ml-3 text-gray-400">Cargando ganadores...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-100">
          🏆 Ganadores de {seasonName || 'la Temporada'}
        </h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          ← Volver
        </button>
      </div>
      
      {winners.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-yellow-400 text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            No hay ganadores registrados
          </h2>
          <p className="text-gray-400 mb-6">
            Los ganadores aparecerán aquí cuando se completen los eventos
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">
            Tabla de Ganadores ({winners.length} ganadores)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Posición</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Usuario</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Evento</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((winner, index) => (
                  <tr
                    key={`${winner.eventId}-${winner.userId || winner.id}`}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-200">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-100">
                      {winner.username || winner.user?.username || "Desconocido"}
                    </td>
                    <td className="px-4 py-3 text-blue-400">
                      {winner.eventName || "Evento"}
                    </td>
                    <td className="px-4 py-3 text-yellow-400 font-bold">
                      {winner.points || winner.totalPoints || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnersView;
