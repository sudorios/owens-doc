import { useParams, useNavigate, useLocation } from "react-router-dom";
import SeasonAside from "../components/dashboard/SeasonAside";
import SeasonScores from "../components/dashboard/SeasonScores";
import WinnersView from "../components/dashboard/WinnersView";
import AccuracyPage from "../components/dashboard/AccuracyPage";
import AddUserModal from "../components/modals/AddUserModal";
import CreateEventModal from "../components/modals/CreateEventModal";
import { useEvents } from "../hooks/useEvents";
import { useModals } from "../hooks/useModals";
import { useEventCreation } from "../hooks/useEventCreation";
import { useUsers } from "../hooks/useUsers";
import { getGuildName, getSeasonName } from "../utils/localStorage";
import "../assets/css/hero.css";

const SeasonDetail = () => {
  const { guildId, seasonId, eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const guildName = getGuildName();
  const seasonName = getSeasonName();

  const {
    events,
    loadingEvents,
    eventScore,
    loadingEventScore,
    seasonScores,
    loadingSeasonScores,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    refreshEvents,
    refreshEventScore,
    refreshSeasonScores,
    goToPage,
    changePageSize
  } = useEvents(seasonId, eventId, guildId);

  const {
    showAddUserModal,
    showEventModal,
    openAddUserModal,
    closeAddUserModal,
    openEventModal,
    closeEventModal
  } = useModals();

  const {
    newEventName,
    setNewEventName,
    newEventState,
    setNewEventState,
    creatingEvent,
    handleCreateEvent,
    resetForm
  } = useEventCreation(guildId, seasonId, refreshEvents);

  const {
    formData,
    setFormData,
    searchQuery,
    searchResults,
    isSearching,
    selectedUser,
    isSubmitting,
    message,
    handleSearchUsers,
    handleSelectUser,
    clearSearch,
    handleAddUser
  } = useUsers(guildId, seasonId, eventId);

  // Determinar la vista actual basada en la URL
  const isWinnersView = location.pathname.includes('/winners');
  const isEventsView = location.pathname.includes('/events');
  const isAccuracyView = location.pathname.includes('/accuracy') && eventId;

  const handleViewSeason = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}`);
  };

  const handleShowEvents = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}/events`);
  };

  const handleShowWinners = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}/winners`);
  };

  const handleShowAccuracy = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}/${eventId}/accuracy`);
  };

  const handleBackFromEvents = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}`);
  };

  const handleBackFromWinners = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}`);
  };

  const handleBackFromAccuracy = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}/${eventId}`);
  };


  const handleCreateEventSubmit = async () => {
    const success = await handleCreateEvent();
    if (success) {
      closeEventModal();
      resetForm();
    }
  };

  const handleAddUserSubmit = async () => {
    try {
      if (eventId) {
        await handleAddUser();
        await refreshEventScore();
      } else {
        await handleAddUser();
        await refreshSeasonScores();
      }
      closeAddUserModal();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Renderizar contenido principal
  const renderMainContent = () => {
    if (isEventsView) {
      return (
        <div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-100">
              Eventos de {seasonName || 'la Temporada'}
            </h1>
            <button
              onClick={handleBackFromEvents}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              ← Volver
            </button>
          </div>
          
          {loadingEvents ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-400">Cargando eventos...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No hay eventos en esta temporada</p>
              <button
                onClick={openEventModal}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                Crear primer evento
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-all duration-200"
                  onClick={() => {
                    navigate(`/dashboard/${guildId}/seasons/${seasonId}/${event.id}`);
                  }}
                >
                  <h3 className="font-semibold text-white text-lg mb-2">
                    {event.name}
                  </h3>
                  {event.description && (
                    <p className="text-gray-400 text-sm mb-3">
                      {event.description}
                    </p>
                  )}
                  <div className="text-xs text-gray-500">
                    {event.startDate && (
                      <p>Inicio: {new Date(event.startDate).toLocaleDateString('es-ES')}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (isWinnersView) {
      return (
        <WinnersView
          guildId={guildId}
          seasonId={seasonId}
          onBack={handleBackFromWinners}
          seasonName={seasonName}
        />
      );
    }

    if (isAccuracyView) {
      return (
        <AccuracyPage
          guildId={guildId}
          eventId={eventId}
          onBack={handleBackFromAccuracy}
        />
      );
    }

    return (
      <SeasonScores
        guildName={guildName}
        seasonName={seasonName}
        eventScore={eventScore}
        loadingEventScore={loadingEventScore}
        seasonScores={seasonScores}
        loadingSeasonScores={loadingSeasonScores}
        hasEventId={!!eventId}
        error={null}
        onShowAddUser={openAddUserModal}
        onShowAccuracy={handleShowAccuracy}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />
    );
  };

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex">
      <SeasonAside
        onCreateEvent={openEventModal}
        onViewSeason={handleViewSeason}
        onShowEvents={handleShowEvents}
        onShowWinners={handleShowWinners}
        seasonName={seasonName}
      />
      
      <main className="flex-1 p-10 text-white mt-20">
        {renderMainContent()}
      </main>


      {showAddUserModal && (
        <AddUserModal
          isOpen={showAddUserModal}
          onClose={closeAddUserModal}
          onSubmit={handleAddUserSubmit}
          isEvent={!!eventId}
          searchQuery={searchQuery}
          searchResults={searchResults}
          isSearching={isSearching}
          selectedUser={selectedUser}
          onSearchUsers={handleSearchUsers}
          onSelectUser={handleSelectUser}
          onClearSearch={clearSearch}
          formData={formData}
          setFormData={setFormData}
          isSubmitting={isSubmitting}
          message={message}
        />
      )}

      {showEventModal && (
        <CreateEventModal
          isOpen={showEventModal}
          onClose={closeEventModal}
          onSubmit={handleCreateEventSubmit}
          newEventName={newEventName}
          setNewEventName={setNewEventName}
          newEventState={newEventState}
          setNewEventState={setNewEventState}
          creatingEvent={creatingEvent}
        />
      )}
    </div>
  );
};

export default SeasonDetail;
