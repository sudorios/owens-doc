import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPredictionAccuracyQuery } from "../hooks/use-events";
import { Target, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AccuracyPage = () => {
  const { guildId, seasonId, eventId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  
  const eventName = localStorage.getItem("eventName") || "Evento";

  const { data: accuracyData = [], isLoading } = useGetPredictionAccuracyQuery(
    guildId || "",
    eventId || "",
    order
  );

  const toggleSort = () => {
    setOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/${guildId}/seasons/${seasonId}/${eventId}`)}>
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Button>
            <Target className="w-6 h-6 text-blue-400" />
            Precisión por Pregunta
          </h1>
          <p className="text-gray-400 text-sm mt-1 ml-11">
            Resultados de predicciones para el evento <span className="text-blue-400">{eventName}</span>.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-gray-400 gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Cargando datos de precisión...
        </div>
      ) : accuracyData.length === 0 ? (
        <div className="text-center py-16 bg-[#111] border border-gray-800 rounded-xl">
          <Target className="w-16 h-16 text-blue-500/20 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-300 mb-2">
            No hay datos de precisión disponibles
          </h2>
          <p className="text-gray-500">
            Los datos de precisión aparecerán aquí cuando estén disponibles.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-800 bg-[#111] overflow-hidden shadow-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-900/80">
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Pregunta</th>
                <th 
                  className="px-6 py-4 text-left text-gray-400 font-semibold text-sm cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={toggleSort}
                >
                  <div className="flex items-center gap-2">
                    Precisión
                    {order === "ASC" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Total Respuestas</th>
                <th className="px-6 py-4 text-left text-gray-400 font-semibold text-sm">Respuestas Correctas</th>
              </tr>
            </thead>
            <tbody>
              {accuracyData.map((item: any, index) => {
                const percentage = Number(item.accuracyPercentage || 0);
                let colorClass = "text-red-400";
                let bgClass = "bg-red-400";
                
                if (percentage >= 80) {
                  colorClass = "text-green-400";
                  bgClass = "bg-green-400";
                } else if (percentage >= 60) {
                  colorClass = "text-yellow-400";
                  bgClass = "bg-yellow-400";
                }

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-200">
                      {item.question || `Pregunta ${index + 1}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-bold w-12 ${colorClass}`}>
                          {percentage.toFixed(1)}%
                        </span>
                        <div className="w-24 bg-gray-800 rounded-full h-2 border border-gray-700 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${bgClass}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-400 font-bold">
                      {item.totalRespuestas || 0}
                    </td>
                    <td className="px-6 py-4 text-green-400 font-bold">
                      {item.respuestasCorrectas || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
