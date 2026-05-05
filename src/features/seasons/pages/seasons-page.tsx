import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSeasonsQuery, useGetGuildScoresQuery } from "../hooks/use-seasons";
import { GuildScoresTable } from "../components/guild-scores-table";
import { SeasonForm } from "../components/season-form";
import { GuildUserForm } from "../components/guild-user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, UserPlus, Trophy, ListOrdered } from "lucide-react";

export const SeasonsPage = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: seasons = [], isLoading: loadingSeasons } = useGetSeasonsQuery(guildId || "");
  const { data: scoresData, isLoading: loadingScores } = useGetGuildScoresQuery(guildId || "", page, pageSize);

  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  if (!guildId) return null;

  const guildName = seasons.length > 0 ? seasons[0].guild?.name : "Unknown Guild";
  const scores = scoresData?.data || [];
  const totalScores = scoresData?.total || 0;
  const totalPages = scoresData?.totalPages || 1;

  // Calculate stats for summary
  const improvements = scores.filter((s: any) => s.lastPosition && s.position < s.lastPosition);
  const declines = scores.filter((s: any) => s.lastPosition && s.position > s.lastPosition);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-6 md:p-10 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Temporadas del servidor: {guildName}</h1>
            </div>
          </div>
          <Button onClick={() => setIsSeasonModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Temporada
          </Button>
        </div>

        {/* Seasons List */}
        <div>
          {loadingSeasons ? (
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              Cargando temporadas...
            </div>
          ) : seasons.length === 0 ? (
            <div className="p-8 text-center bg-[#111] border border-gray-800 rounded-xl text-gray-500">
              No hay temporadas disponibles.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seasons.map((season: any) => (
                <div
                  key={season.id}
                  onClick={() => {
                    localStorage.setItem("seasonName", season.name);
                    navigate(`/dashboard/${guildId}/seasons/${season.id}`);
                  }}
                  className="p-6 bg-[#111] border border-gray-800 rounded-xl hover:bg-gray-800/50 hover:border-gray-700 cursor-pointer transition-all duration-200 group"
                >
                  <h3 className="font-bold text-xl text-gray-200 group-hover:text-purple-400 transition-colors">{season.name}</h3>
                  {season.description && <p className="text-sm text-gray-400 mt-2">{season.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard Section */}
        <div className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Tabla de Puntaje General</h2>
            </div>
            <Button onClick={() => setIsUserModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar Usuario
            </Button>
          </div>

          {/* Quick Stats */}
          {!loadingScores && scores.length > 0 && (improvements.length > 0 || declines.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvements.length > 0 && (
                <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                  <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">↑</span> Subidas destacadas
                  </h3>
                  <div className="space-y-1 text-sm text-green-200/70">
                    {improvements.slice(0, 3).map((s: any) => (
                      <div key={s.userId} className="flex justify-between">
                        <span>{s.user.username}</span>
                        <span className="text-green-400">+{s.lastPosition - s.position} puestos</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {declines.length > 0 && (
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">↓</span> Bajadas destacadas
                  </h3>
                  <div className="space-y-1 text-sm text-red-200/70">
                    {declines.slice(0, 3).map((s: any) => (
                      <div key={s.userId} className="flex justify-between">
                        <span>{s.user.username}</span>
                        <span className="text-red-400">-{s.position - s.lastPosition} puestos</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Table */}
          <div>
            <GuildScoresTable data={scores} isLoading={loadingScores} page={page} pageSize={pageSize} />
            
            {/* Pagination */}
            {!loadingScores && scores.length > 0 && (
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
        </div>
      </div>

      <Dialog open={isSeasonModalOpen} onOpenChange={setIsSeasonModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Crear nueva temporada</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ingresa los detalles para iniciar una nueva temporada en el servidor.
            </DialogDescription>
          </DialogHeader>
          <SeasonForm guildId={guildId || ""} onSuccess={() => setIsSeasonModalOpen(false)} onCancel={() => setIsSeasonModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Agregar usuario al servidor</DialogTitle>
            <DialogDescription className="text-gray-400">
              Agrega un usuario existente a la tabla de puntaje general de este servidor.
            </DialogDescription>
          </DialogHeader>
          <GuildUserForm guildId={guildId || ""} onSuccess={() => setIsUserModalOpen(false)} onCancel={() => setIsUserModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
