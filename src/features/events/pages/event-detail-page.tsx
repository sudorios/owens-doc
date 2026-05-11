import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEventScoresQuery } from "../hooks/use-events";
import { GuildScoresTable } from "@/features/seasons/components/guild-scores-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UserPlus, Target, ArrowLeft } from "lucide-react";
import { EventUserForm } from "../components/event-user-form";

export const EventDetailPage = () => {
  const { guildId, seasonId, eventId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const seasonName = localStorage.getItem("seasonName") || "Temporada";
  const eventName = localStorage.getItem("eventName") || "Evento";

  const { data: scoresData, isLoading } = useGetEventScoresQuery(eventId || "", page, pageSize);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const scores = scoresData?.data || [];
  const totalScores = scoresData?.total || 0;
  const totalPages = scoresData?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/${guildId}/seasons/${seasonId}/events`)}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            {eventName}
          </h1>
          <p className="text-gray-400 text-sm mt-1 ml-11">
            Temporada: <span className="text-purple-400">{seasonName}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setIsUserModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Puntaje
          </Button>
          <Button 
            onClick={() => navigate(`/dashboard/${guildId}/seasons/${seasonId}/${eventId}/accuracy`)} 
            className="bg-slate-700 hover:bg-slate-600 text-white"
          >
            <Target className="w-4 h-4 mr-2" />
            % Precisión
          </Button>
        </div>
      </div>

      <div>
        <GuildScoresTable data={scores as any} isLoading={isLoading} page={page} pageSize={pageSize} />
        
        {!isLoading && scores.length > 0 && (
          <div className="p-4 mt-4 border border-gray-800 rounded-xl flex items-center justify-between bg-[#111]">
            <div className="text-sm text-gray-400">
              Mostrando {scores.length} de {totalScores} usuarios
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300"
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-400 min-w-[5rem] text-center">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Agregar puntaje al evento</DialogTitle>
            <DialogDescription className="text-gray-400">
              Registra los puntos obtenidos por un usuario en este evento.
            </DialogDescription>
          </DialogHeader>
          <EventUserForm 
            guildId={guildId || ""} 
            seasonId={seasonId || ""} 
            eventId={eventId || ""}
            onSuccess={() => setIsUserModalOpen(false)} 
            onCancel={() => setIsUserModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
