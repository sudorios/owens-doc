import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronLeft, ChevronRight, RefreshCw, AlertCircle } from "lucide-react";
import "../assets/css/hero.css";
import { getGuildsByUser } from "../services/guildUser";
import { useDiscordSync } from "../hooks/useDiscordSync";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para búsqueda y paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const limit = 10;

  // Hook para sincronización asíncrona
  const { isSyncing } = useDiscordSync(
    user?.userId,
    () => {
      console.log("Sincronización completada, refrescando...");
      setSuccess("¡Servidores sincronizados con éxito!");
      setTimeout(() => setSuccess(null), 5000);
      fetchData();
    },
    (errMsg) => {
      setError(errMsg);
      setTimeout(() => setError(null), 5000);
    }
  );

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(0); // Reiniciar a la primera página al buscar
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchGuilds = async (userId, start, query) => {
    return await getGuildsByUser(userId, { start, limit, palabraClave: query });
  };

  const fetchData = async () => {
    let validUser = {
      id: "mock_id_temporal",
      username: "Usuario Invitado",
      avatar: "https://cdn.discordapp.com/embed/avatars/0.png"
    };

    try {
      const localUserStr = localStorage.getItem("user_info");
      if (localUserStr) {
        try {
          const localUser = JSON.parse(localUserStr);
          validUser = {
            id: localUser.id,
            userId: localUser.userId,
            username: localUser.username,
            avatar: localUser.avatarUrl || localUser.avatar
          };
        } catch (e) {
          console.error("Error al parsear user_info");
        }
      }

      let guildsData = { guilds: [], totalCount: 0 };
      if (validUser.userId) {
        try {
          guildsData = await fetchGuilds(validUser.userId, currentPage * limit, debouncedSearch);
        } catch (err) {
          console.error("La API de servidores falló:", err);
        }
      }

      setUser({
        ...validUser,
        guilds: guildsData.guilds || [],
      });
      setTotalCount(guildsData.totalCount);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, debouncedSearch]);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl bg-gray-800 border border-gray-700 rounded-md shadow-lg p-8">
        <div className="w-full text-white py-4 px-4 sm:px-8 flex flex-col gap-6">
          {/* Header Dashboard */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <h1 className="font-bold text-2xl md:text-3xl text-white">
              Selecciona tu servidor
            </h1>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </button>
          </div>

          {/* Controles de la página */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-2 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servidor por nombre..."
                className="w-full bg-gray-900 border border-gray-700 text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* Notificación de Error */}
          {error && (
            <div className="mx-4 sm:px-4 mt-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-md flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Notificación de Éxito */}
          {success && (
            <div className="mx-4 sm:px-4 mt-4 bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-md flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <RefreshCw className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{success}</p>
            </div>
          )}

          {/* Estado de Sincronización */}
          {isSyncing && (
            <div className="mx-4 sm:px-8 mt-6">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-md p-6 flex flex-col items-center justify-center text-center gap-4 animate-pulse">
                <RefreshCw className="w-10 h-10 text-blue-400 animate-spin" />
                <div>
                  <h3 className="text-lg font-bold text-white">Sincronizando servidores...</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Estamos actualizando tu lista de servidores con Discord. Esto tomará solo un momento.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grilla de Servidores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-8 mt-6">
          {user?.guilds && user.guilds.length > 0 ? (
            user.guilds.map((guild) => {
              const iconUrl = guild.avatar || "https://cdn.discordapp.com/embed/avatars/0.png";
              return (
                <div
                  key={guild.id}
                  className="flex flex-col items-center group cursor-pointer bg-gray-900 border border-gray-700 hover:border-blue-500 rounded-md p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  onClick={() => {
                    localStorage.setItem("guildName", guild.name);
                    navigate(`/dashboard/${guild.id}/seasons`);
                  }}
                >
                  <img
                    src={iconUrl}
                    alt={guild.name}
                    className="w-20 h-20 rounded-md border border-gray-700 group-hover:scale-110 transition-transform duration-300 object-cover bg-gray-800"
                  />
                  <span className="text-gray-200 group-hover:text-blue-400 mt-4 text-sm text-center font-bold transition-colors line-clamp-1">
                    {guild.name}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              {isSyncing ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-lg">Buscando tus servidores en Discord...</p>
                </div>
              ) : (
                <>
                  <p className="text-lg">No se encontraron servidores</p>
                  {debouncedSearch && <p className="text-sm mt-2">Intenta con otra palabra clave</p>}
                </>
              )}
            </div>
          )}
        </div>

        {/* Paginación (Siempre visible) */}
        <div className="flex items-center justify-center gap-4 mt-10 pb-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`p-2 rounded-md border transition-colors ${currentPage === 0
                ? "border-gray-800 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-300 hover:bg-gray-800"
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-gray-400 text-sm font-medium">
            Página {currentPage + 1} de {Math.max(1, Math.ceil(totalCount / limit))}
          </span>
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={(currentPage + 1) * limit >= totalCount}
            className={`p-2 rounded-md border transition-colors ${(currentPage + 1) * limit >= totalCount
                ? "border-gray-800 text-gray-700 cursor-not-allowed"
                : "border-gray-700 text-gray-300 hover:bg-gray-800"
              }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
