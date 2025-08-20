import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSeasons, createSeason } from "../services/services";

const SeasonsDashboard = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newSeasonName, setNewSeasonName] = useState("");
  const [creating, setCreating] = useState(false);

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
        <div className="w-full max-w-2xl mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              Temporadas del servidor: {guildName}
            </h1>
          </div>
        </div>
        <hr className="border-gray-700/50 mt-4" />

        {loading ? (
          <div className="mt-6 text-gray-300 italic">Cargando seasons...</div>
        ) : (
          <div className="w-full max-w-2xl">
            <ul className="space-y-4">
              <li
                className="bg-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-700 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
                onClick={() => setShowModal(true)}
              >
                <span className="font-bold text-lg text-blue-400">+ Nueva temporada</span>
              </li>
              {seasons.length === 0 ? (
                <li className="text-gray-400 bg-gray-800/50 rounded-lg p-6 text-center">
                  No hay seasons disponibles.
                </li>
              ) : (
                seasons.map((season) => (
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
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Crear nueva temporada</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setCreating(true);
                try {
                  await createSeason({
                    guildId,
                    name: newSeasonName,
                    startDate: new Date(),
                    active: true,
                  });
                  setShowModal(false);
                  setNewSeasonName("");
                  setCreating(false);
                  setLoading(true);
                  // Refresca la lista
                  const data = await getSeasons(guildId);
                  setSeasons(Array.isArray(data) ? data : data.data || []);
                  setLoading(false);
                } catch (err) {
                  alert("Error creando la temporada");
                  setCreating(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Nombre de la temporada</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={newSeasonName}
                  onChange={e => setNewSeasonName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Fecha de inicio</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={new Date().toLocaleString()}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Estado</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value="Activa"
                  disabled
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                  disabled={creating}
                >
                  {creating ? "Creando..." : "Crear"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                  onClick={() => setShowModal(false)}
                  disabled={creating}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonsDashboard;
