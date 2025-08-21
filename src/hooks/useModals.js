import { useState } from "react";

export const useModals = () => {
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const openUsersModal = () => setShowUsersModal(true);
  const closeUsersModal = () => setShowUsersModal(false);
  
  const openAddUserModal = () => setShowAddUserModal(true);
  const closeAddUserModal = () => setShowAddUserModal(false);
  
  const openEventModal = () => setShowEventModal(true);
  const closeEventModal = () => setShowEventModal(false);

  const closeAllModals = () => {
    setShowUsersModal(false);
    setShowAddUserModal(false);
    setShowEventModal(false);
  };

  return {
    showUsersModal,
    showAddUserModal,
    showEventModal,
    openUsersModal,
    closeUsersModal,
    openAddUserModal,
    closeAddUserModal,
    openEventModal,
    closeEventModal,
    closeAllModals
  };
};
