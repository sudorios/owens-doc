import React from "react";

const PositionChangeSummary = ({ scores }) => {
  const getPositionChanges = () => {
    const improvements = [];
    const declines = [];
    const unchanged = [];

    scores.forEach(score => {
      if (!score.lastPosition) {
        unchanged.push(score);
      } else if (score.position < score.lastPosition) {
        improvements.push(score);
      } else if (score.position > score.lastPosition) {
        declines.push(score);
      } else {
        unchanged.push(score);
      }
    });

    return { improvements, declines, unchanged };
  };

  const { improvements, declines, unchanged } = getPositionChanges();

  if (improvements.length === 0 && declines.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Mejoras */}
      {improvements.length > 0 && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-400 text-lg">↑</span>
            <h3 className="text-green-300 font-semibold">Subidas</h3>
            <span className="bg-green-700 text-green-200 text-xs px-2 py-1 rounded-full">
              {improvements.length}
            </span>
          </div>
          <div className="space-y-1">
            {improvements.slice(0, 3).map(score => (
              <div key={score.id} className="text-sm text-green-200">
                <span className="font-medium">{score.username}</span>
                <span className="text-green-300 ml-2">
                  +{score.lastPosition - score.position} puesto{score.lastPosition - score.position > 1 ? 's' : ''}
                </span>
              </div>
            ))}
            {improvements.length > 3 && (
              <div className="text-xs text-green-400">
                +{improvements.length - 3} más...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bajadas */}
      {declines.length > 0 && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-400 text-lg">↓</span>
            <h3 className="text-red-300 font-semibold">Bajadas</h3>
            <span className="bg-red-700 text-red-200 text-xs px-2 py-1 rounded-full">
              {declines.length}
            </span>
          </div>
          <div className="space-y-1">
            {declines.slice(0, 3).map(score => (
              <div key={score.id} className="text-sm text-red-200">
                <span className="font-medium">{score.username}</span>
                <span className="text-red-300 ml-2">
                  -{score.position - score.lastPosition} puesto{score.position - score.lastPosition > 1 ? 's' : ''}
                </span>
              </div>
            ))}
            {declines.length > 3 && (
              <div className="text-xs text-red-400">
                +{declines.length - 3} más...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sin cambios */}
      {unchanged.length > 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 text-lg">→</span>
            <h3 className="text-gray-300 font-semibold">Sin cambios</h3>
            <span className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full">
              {unchanged.length}
            </span>
          </div>
          <div className="space-y-1">
            {unchanged.slice(0, 3).map(score => (
              <div key={score.id} className="text-sm text-gray-300">
                <span className="font-medium">{score.username}</span>
                <span className="text-gray-400 ml-2">
                  {score.lastPosition ? `Puesto ${score.position}` : 'Nuevo'}
                </span>
              </div>
            ))}
            {unchanged.length > 3 && (
              <div className="text-xs text-gray-400">
                +{unchanged.length - 3} más...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionChangeSummary;
