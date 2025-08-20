import { useState } from "react";
import { createSeasonScore } from "../services/seasonScore";
import { searchUsers } from "../services/user";

export const useUsers = (guildId, seasonId) => {
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [formData, setFormData] = useState({
    userId: "",
    totalPoints: "",
    position: "",
    lastPosition: ""
  });

  const handleSearchUsers = async (query) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchUsers(query);
      setSearchResults(Array.isArray(results) ? results : results.data || []);
    } catch (err) {
      console.error("Error buscando usuarios:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData(prev => ({
      ...prev,
      userId: user.id || user.userId
    }));
    setSearchQuery(user.username || user.name || "");
    setSearchResults([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedUser(null);
    setFormData(prev => ({
      ...prev,
      userId: ""
    }));
  };

  const handleAddUser = async () => {
    if (!formData.userId || !formData.totalPoints || !formData.position || !formData.lastPosition) {
      setMessage({ type: "error", text: "Todos los campos son requeridos" });
      return false;
    }

    if (!selectedUser) {
      setMessage({ type: "error", text: "Debes seleccionar un usuario" });
      return false;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });
    
    try {
      console.log("Creando season score para usuario:", selectedUser.username || selectedUser.name);
      console.log("Datos a enviar:", {
        guildId: Number(guildId),
        seasonId: Number(seasonId),
        userId: Number(formData.userId),
        totalPoints: Number(formData.totalPoints),
        position: Number(formData.position),
        lastPosition: Number(formData.lastPosition)
      });
      
      const result = await createSeasonScore(
        Number(guildId),
        Number(seasonId),
        Number(formData.userId),
        Number(formData.totalPoints),
        Number(formData.position),
        Number(formData.lastPosition)
      );
      
      console.log("Season score creado exitosamente:", result);
      setMessage({ type: "success", text: "Usuario agregado exitosamente" });
      
      resetForm();
      return true;
    } catch (err) {
      console.error("Error creando season score:", err);
      setMessage({ type: "error", text: err.message || "Error al agregar usuario" });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      totalPoints: "",
      position: "",
      lastPosition: ""
    });
    setMessage({ type: "", text: "" });
    clearSearch();
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  return {
    participants,
    setParticipants,
    loadingParticipants,
    setLoadingParticipants,
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
    handleAddUser,
    resetForm,
    clearMessage
  };
};
