import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSeasonScoresQuery } from "../hooks/use-seasons";
import { GuildScoresTable } from "../components/guild-scores-table";
import { Button } from "@/components/ui/button";

export const SeasonScoresPage = () => {
  const { guildId, seasonId } = useParams();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const seasonName = localStorage.getItem("seasonName") || "Temporada";

  const { data: scoresData, isLoading } = useGetSeasonScoresQuery(
    guildId || "", 
    seasonId || "", 
    page, 
    pageSize
  );

  const scores = scoresData?.data || [];
  const totalScores = scoresData?.total || 0;
  const totalPages = scoresData?.totalPages || 1;

  const improvements = scores.filter((s: any) => s.lastPosition && s.position < s.lastPosition);
  const declines = scores.filter((s: any) => s.lastPosition && s.position > s.lastPosition);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            Clasificación: <span className="text-purple-400">{seasonName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Tabla de posiciones oficial de la temporada.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      {!isLoading && scores.length > 0 && (improvements.length > 0 || declines.length > 0) && (
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
        <GuildScoresTable data={scores as any} isLoading={isLoading} page={page} pageSize={pageSize} />
        
        {/* Pagination */}
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
    </div>
  );
};
