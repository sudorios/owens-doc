import React from "react";

const ScoresTable = ({ scores, isLoading, emptyMessage, showPositionChanges = false }) => {
  const getPositionChange = (position, lastPosition) => {
    if (!lastPosition || position === lastPosition) return null;
    
    const change = lastPosition - position;
    const isImprovement = change > 0;
    
    return {
      change: Math.abs(change),
      isImprovement,
      arrow: isImprovement ? "↑" : "↓",
      color: isImprovement ? "text-green-400" : "text-red-400"
    };
  };

  if (isLoading) {
    return (
      <div className="mt-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="mt-4 text-center py-8">
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-900">
          <tr>
            {showPositionChanges ? (
              <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Posición</th>
            ) : (
              <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">ID</th>
            )}
            <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Usuario</th>
            <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => {
            const positionChange = showPositionChanges ? getPositionChange(score.position, score.lastPosition) : null;
            
            return (
              <tr
                key={score.id}
                className={`${
                  i % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                } hover:bg-gray-600 transition`}
              >
                <td className="px-4 py-2">
                  {showPositionChanges ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-200 font-medium text-lg">
                        {score.position}
                      </span>
                      {positionChange && (
                        <div className="flex items-center gap-1">
                          <span className={`text-lg font-bold ${positionChange.color}`}>
                            {positionChange.arrow}
                          </span>
                          <span className={`text-sm ${positionChange.color}`}>
                            {positionChange.change}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({score.lastPosition}→{score.position})
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-200 font-medium">
                      {score.id}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-100">
                  {score.user?.username || score.username || "Desconocido"}
                </td>
                <td className="px-4 py-2 text-blue-400 font-bold">
                  {score.totalPoints || score.points || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresTable;
