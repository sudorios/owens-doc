import React from "react";
import ScoresTable from "./ScoresTable";
import Pagination from "./Pagination";
import PositionChangeSummary from "./PositionChangeSummary";

const SeasonScores = ({
  guildName,
  seasonName,
  eventScore,
  loadingEventScore,
  seasonScores,
  loadingSeasonScores,
  hasEventId,
  error,
  onShowAddUser,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange
}) => {

  const scores = hasEventId ? eventScore : seasonScores;
  const isLoading = hasEventId ? loadingEventScore : loadingSeasonScores;
  const emptyMessage = hasEventId 
    ? "No hay puntajes para este evento." 
    : "No hay puntajes para esta temporada.";

  return (
    <main className="flex-1 p-10 text-white">
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold shadow-md"
            onClick={onShowAddUser}
          >
            + Usuario
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-100 flex items-center gap-2">
        {hasEventId ? "Puntajes del Evento" : "Puntajes de la Temporada"}
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-900 border border-red-700 rounded-lg">
          <p className="text-red-200 font-medium">Error al cargar los datos:</p>
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Resumen de cambios de posición */}
      {!hasEventId && (
        <PositionChangeSummary scores={seasonScores} />
      )}

      <ScoresTable
        scores={scores}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        showPositionChanges={!hasEventId}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          isLoading={isLoading}
        />
      )}
    </main>
  );
};

export default SeasonScores;
