import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeasonAside from "../components/SeasonAside";
import SeasonScores from "../components/SeasonScores";
import UsersModal from "../components/modals/UsersModal";
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

  const { 
    events, 
    loadingEvents, 
    eventScore, 
    loadingEventScore, 
    seasonScores,
    loadingSeasonScores,
    error,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    refreshEvents,
    refreshSeasonScores,
    goToPage,
    nextPage,
    prevPage,
    changePageSize
  } = useEvents(seasonId, eventId, guildId);
  
  const { 
    showUsersModal, 
    showAddUserModal, 
    showEventModal,
    openUsersModal,
    closeUsersModal,
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
    participants, 
    loadingParticipants, 
    formData,
    setFormData,
    isSubmitting,
    message,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedUser,
    handleSearchUsers,
    handleSelectUser,
    clearSearch,
    handleAddUser 
  } = useUsers(guildId, seasonId);

  const guildName = getGuildName();
  const seasonName = getSeasonName();

  const handleViewSeason = () => {
    navigate(`/dashboard/${guildId}/seasons/${seasonId}`);
  };

  const handleCreateEventSubmit = async () => {
    const success = await handleCreateEvent();
    if (success) {
      closeEventModal();
      resetForm();
    }
  };

  const handleAddUserSubmit = async () => {
    const success = await handleAddUser();
    if (success) {
      closeAddUserModal();
      if (!eventId) {
        await refreshSeasonScores();
      }
    }
  };

  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex">
      <SeasonAside
        events={events}
        loadingEvents={loadingEvents}
        onCreateEvent={openEventModal}
        onSelectEvent={(id) => navigate(`/dashboard/${guildId}/seasons/${seasonId}/${id}`)}
        onManageUsers={openUsersModal}
        onViewSeason={handleViewSeason}
        seasonName={seasonName}
      />

      <SeasonScores
        guildName={guildName}
        seasonName={seasonName}
        eventScore={eventScore}
        loadingEventScore={loadingEventScore}
        seasonScores={seasonScores}
        loadingSeasonScores={loadingSeasonScores}
        hasEventId={!!eventId}
        error={error}
        onShowAddUser={openAddUserModal}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />

      <UsersModal
        isOpen={showUsersModal}
        onClose={closeUsersModal}
        participants={participants}
        loadingParticipants={loadingParticipants}
      />

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={closeAddUserModal}
        onSubmit={handleAddUserSubmit}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        message={message}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
        selectedUser={selectedUser}
        onSearchUsers={handleSearchUsers}
        onSelectUser={handleSelectUser}
        onClearSearch={clearSearch}
      />

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
    </div>
  );
};

export default SeasonDetail;
