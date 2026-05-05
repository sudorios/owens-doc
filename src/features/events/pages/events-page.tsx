import { useParams, useNavigate } from "react-router-dom";
import { useGetEventsQuery } from "../hooks/use-events";
import { CalendarDays } from "lucide-react";

export const EventsPage = () => {
  const { guildId, seasonId } = useParams();
  const navigate = useNavigate();
  const seasonName = localStorage.getItem("seasonName") || "Temporada";

  const { data: events = [], isLoading } = useGetEventsQuery(seasonId || "");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-purple-400" />
            Eventos de <span className="text-purple-400">{seasonName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Selecciona un evento para ver sus puntajes.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          Cargando eventos...
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 text-center bg-[#111] border border-gray-800 rounded-xl text-gray-500">
          No hay eventos en esta temporada. Usa el menú lateral para crear uno nuevo.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                localStorage.setItem("eventName", event.name);
                navigate(`/dashboard/${guildId}/seasons/${seasonId}/${event.id}`);
              }}
              className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:bg-gray-800/50 hover:border-gray-700 cursor-pointer transition-all duration-200 group"
            >
              <h3 className="font-bold text-xl text-gray-200 group-hover:text-purple-400 transition-colors">
                {event.name}
              </h3>
              {event.description && (
                <p className="text-sm text-gray-400 mt-2">{event.description}</p>
              )}
              {event.startDate && (
                <div className="mt-4 text-xs text-gray-500 bg-black/20 inline-block px-2 py-1 rounded">
                  Inicio: {new Date(event.startDate).toLocaleDateString('es-ES')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
