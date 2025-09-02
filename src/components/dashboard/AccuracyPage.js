import React, { useState, useEffect } from 'react';
import { getAccuracyByQuestion } from '../../services/prediction';
import { LoadingSpinner } from '../common';
import { FaSortUp, FaSortDown } from "react-icons/fa";

const AccuracyPage = ({ guildId, eventId, onBack }) => {
  const [sortDirection, setSortDirection] = useState("ASC");
  const toggleSort = async () => {
    const newDirection = sortDirection === "ASC" ? "DESC" : "ASC";
    setSortDirection(newDirection);

    try {
      setLoading(true);
      setError(null);

      const data = await getAccuracyByQuestion(guildId, eventId, newDirection);
      setAccuracyData(data);
    } catch (err) {
      console.error("Error cargando datos de precisión:", err);
      setError("Error al cargar los datos de precisión");
    } finally {
      setLoading(false);
    }
  };

  const [accuracyData, setAccuracyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccuracyData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAccuracyByQuestion(guildId, eventId);
        setAccuracyData(data);
      } catch (err) {
        console.error("Error cargando datos de precisión:", err);
        setError("Error al cargar los datos de precisión");
      } finally {
        setLoading(false);
      }
    };

    if (guildId && eventId) {
      fetchAccuracyData();
    }
  }, [guildId, eventId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
        <span className="ml-3 text-gray-400">Cargando datos de precisión...</span>
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
          Precisión por Pregunta
        </h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          ← Volver
        </button>
      </div>

      {accuracyData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-blue-400 text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">
            No hay datos de precisión disponibles
          </h2>
          <p className="text-gray-400 mb-6">
            Los datos de precisión aparecerán aquí cuando estén disponibles
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">
            Datos de Precisión ({accuracyData.length} registros)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Pregunta</th>
                  <th
                    className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm cursor-pointer select-none"
                    onClick={toggleSort}
                  >
                    <div className="flex items-center gap-2">
                      Precisión
                      {sortDirection === "ASC" ? (
                        <FaSortUp className="inline-block" />
                      ) : (
                        <FaSortDown className="inline-block" />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Total Respuestas</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-bold uppercase text-sm">Respuestas Correctas</th>
                </tr>
              </thead>
              <tbody>
                {accuracyData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-100">
                      {item.question || `Pregunta ${index + 1}`}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.accuracyPercentage >= 80 ? 'text-green-400' :
                          item.accuracyPercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                          {Number(item.accuracyPercentage || 0).toFixed(1)}%
                        </span>
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.accuracyPercentage >= 80 ? 'bg-green-400' :
                              item.accuracyPercentage >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}
                            style={{ width: `${item.accuracyPercentage || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-blue-400 font-bold">
                      {item.totalRespuestas || 0}
                    </td>
                    <td className="px-4 py-3 text-green-400 font-bold">
                      {item.respuestasCorrectas || 0}
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

export default AccuracyPage;
