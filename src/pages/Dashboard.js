import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { syncGuilds as syncGuildsApi } from "../services/season";
import "../assets/css/hero.css";
import { getUser } from "../services/user";
import { getGuildsByUser } from "../services/guildUser";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const fetchGuilds = async (userId) => {
    return await getGuildsByUser(userId);
  };

  const syncGuilds = async () => {
    if (syncing || cooldown > 0) return;

    try {
      setSyncing(true);
      await syncGuildsApi();
      const guilds = await fetchGuilds();
      setUser({ ...user, guilds });
      setCooldown(10);
    } catch (err) {
      if (err.response?.status === 429) {
        alert("Estás haciendo demasiadas solicitudes. Espera unos segundos.");
      } else {
        console.error(err);
        alert("Error sincronizando guilds.");
      }
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const fetchData = async () => {
    try {
      const me = await getUser();
      let guilds = await fetchGuilds(me.id);
      if (guilds.length === 0) {
        guilds = await syncGuilds();
      }
      setUser({
        ...me,
        guilds,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex flex-col items-center pt-20">
      <div className="w-11/12 max-w-6xl bg-[#241b3d] rounded-2xl shadow-lg p-8 mt-10">
        <div className="w-full text-white py-4 px-8 flex items-center justify-between">
          <span className="font-bold text-2xl">
            Hola, selecciona un servidor
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard/users")}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-medium shadow transition-colors"
            >
              Gestionar usuarios
            </button>
            <button
              onClick={syncGuilds}
              disabled={syncing || cooldown > 0}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                syncing || cooldown > 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {syncing
                ? "Syncing..."
                : cooldown > 0
                ? `Wait ${cooldown}s`
                : "Sincronizar servidores"}
            </button>
          </div>
        </div>
        <hr className="border-gray-600/50 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {user.guilds.map((guild) => {
            const iconUrl =
              guild.avatar || "https://cdn.discordapp.com/embed/avatars/0.png";
            return (
              <div
                key={guild.id}
                className="flex flex-col items-center"
                onClick={() => {
                  localStorage.setItem("guildName", guild.name);
                  navigate(`/dashboard/${guild.guildId}/seasons`);
                }}
              >
                <img
                  src={iconUrl}
                  alt={guild.name}
                  className="w-20 h-20 rounded-full border-2 border-gray-700 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
                />
                <span className="text-white mt-2 text-sm text-center">
                  {guild.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
