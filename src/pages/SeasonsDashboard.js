import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSeasons, createSeason } from "../services/services";
import { getScore, createGuildUser } from "../services/guildUser";
import { searchUsers } from "../services/user";
import "../assets/css/hero.css";

const SeasonsDashboard = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();

  const [seasons, setSeasons] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingScores, setLoadingScores] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newSeasonName, setNewSeasonName] = useState("");
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    userId: "",
    username: "",
    role: "USER",
    points: 0,
    lastPosition: 0,
    position: 0
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    total: 0
  });

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

  const fetchScores = async (page = 1) => {
    if (!seasons || seasons.length === 0) return;
    setLoadingScores(true);

    try {
      const data = await getScore(guildId, page, pagination.pageSize);
      setScores(data?.data || []);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        total: data.total || 0,
        totalPages: Math.ceil((data.total || 0) / pagination.pageSize)
      }));
    } catch (err) {
      console.error("Error cargando puntajes", err);
    } finally {
      setLoadingScores(false);
    }
  };

  useEffect(() => {
    fetchScores(1);
  }, [seasons, guildId]);

  const guildName =
    seasons.length > 0 ? seasons[0].guild?.name : "Unknown Guild";

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex flex-col items-center pt-40 text-white px-8">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold tracking-wide mb-6">
          Temporadas del servidor: {guildName}
        </h1>

        <hr className="border-gray-700/50 mb-6" />

        {loading ? (
          <div className="text-gray-300 italic">Cargando seasons...</div>
        ) : (
          <ul className="space-y-4 mb-10">
            <li
              className="bg-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-700 transition-all"
              onClick={() => setShowModal(true)}
            >
              <span className="font-bold text-lg text-blue-400">
                + Nueva temporada
              </span>
            </li>
            {seasons.length === 0 ? (
              <li className="text-gray-400 bg-gray-800/50 rounded-lg p-6 text-center">
                No hay seasons disponibles.
              </li>
            ) : (
              seasons.map((season) => (
                <li
                  key={season.id}
                  className="bg-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-700 transition-all"
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
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            Tabla de Puntaje General
          </h2>
          <button
            onClick={() => setShowUserModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            + Agregar Usuario
          </button>
        </div>
        {loadingScores ? (
          <div className="text-gray-400 italic">Cargando puntajes...</div>
        ) : scores.length === 0 ? (
          <div className="text-gray-400 italic">
            No hay puntajes disponibles.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="px-4 py-2">Posición</th>
                  <th className="px-4 py-2">Usuario</th>
                  <th className="px-4 py-2">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {scores
                  .sort((a, b) => b.points - a.points)
                  .map((score, index) => (
                    <tr
                      key={score.userId}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="px-4 py-2 font-bold">
                        {((pagination.currentPage - 1) * pagination.pageSize) + index + 1}
                      </td>
                      <td className="px-4 py-2">{score.user.username}</td>
                      <td className="px-4 py-2">{score.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            
            {/* Paginación */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-700/50 pt-4">
              <div className="text-sm text-gray-400">
                Mostrando {scores.length} de {pagination.total} usuarios
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchScores(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    pagination.currentPage === 1
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Anterior
                </button>
                <span className="text-sm text-gray-400">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchScores(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    pagination.currentPage >= pagination.totalPages
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          {" "}
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
            {" "}
            <h2 className="text-2xl font-bold mb-4">
              Crear nueva temporada
            </h2>{" "}
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
                  const data = await getSeasons(guildId);
                  setSeasons(Array.isArray(data) ? data : data.data || []);
                  setLoading(false);
                } catch (err) {
                  alert("Error creando la temporada");
                  setCreating(false);
                }
              }}
            >
              {" "}
              <div className="mb-4">
                {" "}
                <label className="block text-sm font-semibold mb-1">
                  Nombre de la temporada
                </label>{" "}
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={newSeasonName}
                  onChange={(e) => setNewSeasonName(e.target.value)}
                  required
                />{" "}
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="block text-sm font-semibold mb-1">
                  Fecha de inicio
                </label>{" "}
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={new Date().toLocaleString()}
                  disabled
                />{" "}
              </div>{" "}
              <div className="mb-4">
                {" "}
                <label className="block text-sm font-semibold mb-1">
                  Estado
                </label>{" "}
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value="Activa"
                  disabled
                />{" "}
              </div>{" "}
              <div className="flex gap-4 mt-6">
                {" "}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                  disabled={creating}
                >
                  {" "}
                  {creating ? "Creando..." : "Crear"}{" "}
                </button>{" "}
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                  onClick={() => setShowModal(false)}
                  disabled={creating}
                >
                  {" "}
                  Cancelar{" "}
                </button>{" "}
              </div>{" "}
            </form>{" "}
          </div>{" "}
        </div>
      )}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Agregar usuario al servidor</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newUser.userId || !guildId) {
                  alert("Por favor, selecciona un usuario");
                  return;
                }
                setCreating(true);
                try {
                  const userData = {
                    userId: newUser.userId,
                    role: newUser.role,
                    points: parseInt(newUser.points) || 0,
                    lastPosition: parseInt(newUser.position),
                    position: parseInt(newUser.position)
                  };

                  await createGuildUser(guildId, userData);
                  setShowUserModal(false);
                  setNewUser({
                    userId: "",
                    username: "",
                    role: "USER",
                    points: 0,
                    lastPosition: 0,
                    position: 0
                  });
                  setLoadingScores(true);
                  const data = await getScore(guildId);
                  setScores(data?.data || []);
                  setLoadingScores(false);
                } catch (err) {
                  console.error("Error al agregar usuario:", err);
                  alert(err.response?.data?.error || "Error agregando el usuario");
                } finally {
                  setCreating(false);
                }
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Buscar Usuario
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                      value={newUser.username}
                      onChange={async (e) => {
                        const value = e.target.value;
                        setNewUser(prev => ({ ...prev, username: value }));
                        
                        if (value.length >= 2) {
                          setSearching(true);
                          try {
                            const results = await searchUsers(value);
                            setSearchResults(results.data || []);
                          } catch (err) {
                            console.error("Error searching users:", err);
                          }
                          setSearching(false);
                        } else {
                          setSearchResults([]);
                        }
                      }}
                      placeholder="Ingresa el nombre del usuario"
                      required
                    />
                    
                    {/* Lista de resultados */}
                    {searchResults.length > 0 && (
                      <div className="absolute z-50 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {searchResults.map(user => (
                          <div
                            key={user.id}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setNewUser(prev => ({
                                ...prev,
                                userId: user.id,
                                username: user.username
                              }));
                              setSearchResults([]);
                            }}
                          >
                            {user.username}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {newUser.userId && (
                    <div className="mt-1 text-sm text-green-400">
                      Usuario seleccionado: {newUser.username} (ID: {newUser.userId})
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Rol
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Puntos
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                    value={newUser.points}
                    onChange={(e) => setNewUser({ ...newUser, points: parseInt(e.target.value) })}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Posición Actual
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                    value={newUser.position}
                    onChange={(e) => setNewUser({ ...newUser, position: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-semibold"
                  disabled={creating}
                >
                  {creating ? "Agregando..." : "Agregar Usuario"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                  onClick={() => {
                    setShowUserModal(false);
                    setNewUser({
                      userId: "",
                      username: "",
                      role: "USER",
                      points: 0,
                      lastPosition: 0,
                      position: 0
                    });
                  }}
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
