import { useParams, useNavigate } from "react-router-dom";
import { useGetEventWinnersQuery } from "../hooks/use-events";
import { Award, Trophy } from "lucide-react";

export const WinnersPage = () => {
  const { guildId } = useParams();
  const seasonName = localStorage.getItem("seasonName") || "Temporada";

  const { data: winnersData = [], isLoading } = useGetEventWinnersQuery(guildId || "");

  const winners = [...winnersData].sort((a: any, b: any) => {
    const pointsDiff = (b.points || b.totalPoints || 0) - (a.points || a.totalPoints || 0);
    if (pointsDiff !== 0) return pointsDiff;
    const dateA = new Date(a.eventDate || 0).getTime();
    const dateB = new Date(b.eventDate || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-400" />
            Ganadores de <span className="text-yellow-400">{seasonName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Los mejores puntajes de los eventos del servidor.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
          <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          Cargando ganadores...
        </div>
      ) : winners.length === 0 ? (
        <div className="text-center py-16 bg-[#111] border border-gray-800 rounded-xl">
          <Trophy className="w-16 h-16 text-yellow-500/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-300 mb-2">
            No hay ganadores registrados
          </h2>
          <p className="text-gray-500">
            Los ganadores aparecerán aquí cuando se completen los eventos.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-[#111] overflow-hidden shadow-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-900/80">
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Posición</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Usuario</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Evento</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Puntos</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner: any, index) => (
                <tr
                  key={`${winner.eventId}-${winner.userId || winner.id || index}`}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-gray-300 font-bold text-sm border border-gray-700">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-200">
                    {winner.username || winner.user?.username || "Desconocido"}
                  </td>
                  <td className="px-6 py-4 text-blue-400">
                    {winner.eventName || "Evento"}
                  </td>
                  <td className="px-6 py-4 font-bold text-yellow-400 text-lg">
                    {winner.points || winner.totalPoints || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
