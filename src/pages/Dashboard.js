import React, { useEffect, useState } from "react";
import { getUser, getGuilds, syncGuilds as syncGuildsApi } from "../api/api";
import "../assets/css/hero.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const fetchGuilds = async () => {
    return await getGuilds();
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
      let guilds = await fetchGuilds();
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

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex flex-col items-center pt-20">
      <div className="w-full text-white py-4 px-8 flex items-center justify-between">
        <span className="font-bold text-2xl">
          Hello, {user.username}! Please select a server
        </span>
        <button
          onClick={syncGuilds}
          disabled={syncing || cooldown > 0}
          className={`px-4 py-2 rounded ${
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

      <div className="grid grid-cols-4 gap-6 mt-10">
        {user.guilds.map((guild) => {
          const iconUrl =
            guild.avatar || "https://cdn.discordapp.com/embed/avatars/0.png";

          return (
            <div
              key={guild.id}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
            >
              <img
                src={iconUrl}
                alt={guild.name}
                className="w-20 h-20 rounded-full"
              />
              <span className="text-white mt-2 text-sm">{guild.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
