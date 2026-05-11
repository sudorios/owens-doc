import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEventsQuery } from "../hooks/use-events";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "@/features/events/components/event-form";

export const EventsPage = () => {
  const { guildId, seasonId } = useParams();
  const navigate = useNavigate();
  const seasonName = localStorage.getItem("seasonName") || "Temporada";

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const { data: events = [], isLoading } = useGetEventsQuery(seasonId || "");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-purple-400" />
            Eventos de <span className="text-purple-400">{seasonName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Selecciona un evento para ver sus puntajes.
          </p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 shadow-md w-full sm:w-auto"
          onClick={() => setIsEventModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          Cargando eventos...
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 text-center bg-gray-800 border border-gray-700 rounded-xl text-gray-400">
          No hay eventos en esta temporada. Usa el botón "Nuevo Evento" para crear uno.
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
              className="p-6 bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700/50 hover:border-purple-500/50 cursor-pointer transition-all duration-200 group shadow-sm"
            >
              <h3 className="font-bold text-xl text-gray-200 group-hover:text-purple-400 transition-colors">
                {event.name}
              </h3>
              {event.description && (
                <p className="text-sm text-gray-400 mt-2">{event.description}</p>
              )}
              {event.startDate && (
                <div className="mt-4 text-xs text-purple-300 font-bold bg-purple-500/10 inline-block px-2 py-1 rounded">
                  Inicio: {new Date(event.startDate).toLocaleDateString('es-ES')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Event Modal */}
      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Crear nuevo evento</DialogTitle>
          </DialogHeader>
          <EventForm 
            guildId={guildId || ""} 
            seasonId={seasonId || ""} 
            onSuccess={() => setIsEventModalOpen(false)} 
            onCancel={() => setIsEventModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
