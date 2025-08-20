import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvents, getEventScore, createEvent } from "../services/services";
import SeasonAside from "../components/SeasonAside";
import SeasonScores from "../components/SeasonScores";
import "../assets/css/hero.css";

const SeasonDetail = () => {
  const { guildId, seasonId, eventId } = useParams();
  const navigate = useNavigate();

  // Estados principales
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventScore, setEventScore] = useState([]);
  const [loadingEventScore, setLoadingEventScore] = useState(true);

  // Modales
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  // Datos auxiliares
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const [newEventState, setNewEventState] = useState("pending");
  const [creatingEvent, setCreatingEvent] = useState(false);

  const guildName = localStorage.getItem("guildName") || "Unknown Guild";
  const seasonName = localStorage.getItem("seasonName") || "Unknown Season"; 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingEvents(true);
        const dataEvents = await getEvents(seasonId);
        setEvents(Array.isArray(dataEvents) ? dataEvents : dataEvents.data || []);
        setLoadingEvents(false);

        if (eventId) {
          setLoadingEventScore(true);
          const dataScores = await getEventScore(eventId);
          setEventScore(Array.isArray(dataScores) ? dataScores : dataScores.data || []);
          setLoadingEventScore(false);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
        setLoadingEvents(false);
        setLoadingEventScore(false);
      }
    };
    fetchData();
  }, [seasonId, eventId]);

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex">
      <SeasonAside
        events={events}
        loadingEvents={loadingEvents}
        onCreateEvent={() => setShowEventModal(true)}
        onSelectEvent={(id) => navigate(`/dashboard/${guildId}/seasons/${seasonId}/${id}`)}
      />

      <SeasonScores
        guildName={guildName}
        seasonName={seasonName}
        eventScore={eventScore}
        loadingEventScore={loadingEventScore}
        onShowUsers={() => setShowUsersModal(true)}
        onShowAddUser={() => setShowAddUserModal(true)}
      />

      {/* Modal de usuarios */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Usuarios participantes</h2>
            <div className="mb-4">
              {loadingParticipants ? (
                <span className="text-gray-400">Cargando usuarios...</span>
              ) : participants.length === 0 ? (
                <span className="text-gray-400">No hay usuarios registrados.</span>
              ) : (
                <ul className="list-disc pl-5">
                  {participants.map((user) => (
                    <li key={user.id} className="mb-2 text-white">
                      {user.username || user.userId}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                onClick={() => setShowUsersModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal agregar usuario */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Agregar usuario</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // TODO: llamar API para agregar usuario
                setShowAddUserModal(false);
                setNewUserId("");
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">User ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
                >
                  Agregar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 text-white">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Crear nuevo evento</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setCreatingEvent(true);
                try {
                  const userId = localStorage.getItem("userId");
                  await createEvent({
                    guildId: Number(guildId),
                    userId: Number(userId),
                    seasonId: Number(seasonId),
                    name: newEventName,
                    state: newEventState,
                  });
                  setShowEventModal(false);
                  setNewEventName("");
                  setNewEventState("pending");
                  setCreatingEvent(false);
                  setLoadingEvents(true);

                  const data = await getEvents(seasonId);
                  setEvents(Array.isArray(data) ? data : data.data || []);
                  setLoadingEvents(false);
                } catch (err) {
                  alert("Error creando el evento");
                  setCreatingEvent(false);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Nombre del evento</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Estado</label>
                <select
                  className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  value={newEventState}
                  onChange={(e) => setNewEventState(e.target.value)}
                  required
                >
                  <option value="pending">Pendiente</option>
                  <option value="active">Activo</option>
                  <option value="finished">Finalizado</option>
                </select>
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
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
                  disabled={creatingEvent}
                >
                  {creatingEvent ? "Creando..." : "Crear"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                  onClick={() => setShowEventModal(false)}
                  disabled={creatingEvent}
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

export default SeasonDetail;
