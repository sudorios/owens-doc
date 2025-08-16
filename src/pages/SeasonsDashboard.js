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

  return (
    <div className="min-h-screen bg-[#1a132f] flex flex-col items-center pt-20 text-white">
      <h1 className="text-3xl font-bold mb-6">Seasons for Guild: {guildId}</h1>
      {loading ? (
        <div className="mt-4">Cargando seasons...</div>
      ) : (
        <div className="mt-4 w-full max-w-2xl">
          {seasons.length === 0 ? (
            <div>No hay seasons disponibles.</div>
          ) : (
            <ul className="space-y-4">
              {seasons.map((season) => (
                <li
                  key={season.id}
                  className="bg-gray-800 rounded p-4 cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => navigate(`/dashboard/${guildId}/seasons/${season.id}`)}
                >
                  <div className="font-bold text-lg">{season.name}</div>
                  <div className="text-sm text-gray-300">
                    {season.description}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SeasonsDashboard;
