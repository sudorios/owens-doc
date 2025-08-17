import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvents, getEventScore } from "../api/services";
import "../assets/css/hero.css";

const SeasonDetail = () => {
  const { guildId, seasonId, eventId } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [eventScore, setEventScore] = useState([]);
  const [loadingEventScore, setLoadingEventScore] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const data = await getEvents(seasonId);
        setEvents(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };
    if (seasonId) fetchEvents();
  }, [seasonId]);

  useEffect(() => {
    const fetchEventScore = async () => {
      if (!eventId) return;
      setLoadingEventScore(true);
      try {
        const data = await getEventScore(eventId);
        setEventScore(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching event score:", err);
        setEventScore([]);
      } finally {
        setLoadingEventScore(false);
      }
    };
    fetchEventScore();
  }, [eventId]);

  const guildName = localStorage.getItem("guildName");
  const seasonName = localStorage.getItem("seasonName");

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f]  flex">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col border-r border-gray-800 mt-4">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">Eventos</h2>

        <p className="text-gray-400 text-sm mb-2 uppercase tracking-wide">
          Lista de eventos
        </p>

        <nav className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2">
          {loadingEvents ? (
            <span className="text-gray-400">Cargando eventos...</span>
          ) : events.length === 0 ? (
            <span className="text-gray-400">No hay eventos.</span>
          ) : (
            events.map((event) => (
              <span
                key={event.id}
                className="font-mono text-base truncate px-3 py-2 rounded-lg bg-gray-800 transition-all duration-200 cursor-pointer hover:bg-gray-700 hover:shadow-md hover:translate-x-1"
                title={event.name}
                onClick={() =>
                  navigate(
                    `/dashboard/${guildId}/seasons/${seasonId}/${event.id}`
                  )
                }
              >
                {event.name}
              </span>
            ))
          )}
        </nav>
      </aside>

      <main className="flex-1 p-10 text-white mt-20">
        <div className="bg-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between shadow">
          <div>
            <div className="text-white font-bold uppercase text-sm">Temporada:</div>
            <div className="text-2xl font-extrabold text-orange-500 tracking-tight uppercase">{seasonName || 'Nombre de la Season'}</div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-white font-bold uppercase text-sm">Servidor:</div>
            <div className="text-xl font-bold text-orange-500 tracking-tight uppercase">{guildName || 'Nombre del Guild'}</div>
          </div>
        </div>

        <div className="border-b border-gray-300 mb-6" />
        <h2 className="text-xl font-bold mb-4 text-gray-100">Historial de Puntajes</h2>
        <div className="border-b border-gray-300 mb-6" />

        {loadingEventScore ? (
          <p className="text-gray-300">Cargando puntajes del evento...</p>
        ) : eventScore.length === 0 ? (
          <p className="text-gray-300">No hay puntajes para este evento.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-white font-bold">ID</th>
                  <th className="px-4 py-2 text-left text-white font-bold">Usuario</th>
                  <th className="px-4 py-2 text-left text-white font-bold">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {eventScore.map((score) => (
                  <tr key={score.id} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-white font-semibold">{score.id}</td>
                    <td className="px-4 py-2 text-white">{score.user?.username || "Desconocido"}</td>
                    <td className="px-4 py-2 text-white font-bold">{score.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default SeasonDetail;
