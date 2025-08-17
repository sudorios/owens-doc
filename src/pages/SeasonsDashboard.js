import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSeasons } from "../api/services";

const SeasonsDashboard = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const data = await getSeasons(guildId);
        setSeasons(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeasons();
  }, [guildId]);

  const guildName =
    seasons.length > 0 ? seasons[0].guild?.name : "Unknown Guild";

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex flex-col items-center pt-40 text-white px-8">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl mb-8">
        <div className="w-full max-w-2xl mb-8">
          <h1 className="text-3xl font-bold tracking-wide">
            Temporadas del servidor: {guildName}
          </h1>
          <hr className="border-gray-700/50 mt-4" />
        </div>

        {loading ? (
          <div className="mt-6 text-gray-300 italic">Cargando seasons...</div>
        ) : (
          <div className="w-full max-w-2xl">
            {seasons.length === 0 ? (
              <div className="text-gray-400 bg-gray-800/50 rounded-lg p-6 text-center">
                No hay seasons disponibles.
              </div>
            ) : (
              <ul className="space-y-4">
                {seasons.map((season) => (
                  <li
                    key={season.id}
                    className="bg-gray-800 rounded-xl p-5 cursor-pointer 
                         hover:bg-gray-700 hover:shadow-md hover:-translate-y-1 
                         transition-all duration-200"
                    onClick={() => {
                      localStorage.setItem("seasonName", season.name);
                      navigate(`/dashboard/${guildId}/seasons/${season.id}`);
                    }}
                  >
                    <div className="font-bold text-lg">{season.name}</div>
                    {season.description && (
                      <div className="text-sm text-gray-400 mt-1">
                        {season.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonsDashboard;
