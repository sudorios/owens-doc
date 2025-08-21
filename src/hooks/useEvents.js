import { useState, useEffect } from "react";
import { getEvents } from "../services/services";
import { getSeasonScores } from "../services/seasonScore";
import { getEventScore } from "../services/evenScore";

export const useEvents = (seasonId, eventId, guildId) => {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventScore, setEventScore] = useState([]);
  const [loadingEventScore, setLoadingEventScore] = useState(true);
  const [seasonScores, setSeasonScores] = useState([]);
  const [loadingSeasonScores, setLoadingSeasonScores] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoadingEvents(true);
        
        console.log("Fetching events for season:", seasonId);
        const dataEvents = await getEvents(seasonId);
        setEvents(Array.isArray(dataEvents) ? dataEvents : dataEvents.data || []);
        setLoadingEvents(false);

        if (eventId) {
          console.log("Fetching event scores for event:", eventId);
          setLoadingEventScore(true);
          const dataScores = await getEventScore(eventId, currentPage, pageSize);
          
          if (dataScores && dataScores.data) {
            setEventScore(dataScores.data || []);
            setTotalItems(dataScores.total || 0);
            setTotalPages(dataScores.totalPages || 0);
          } else {
            const scoresArray = Array.isArray(dataScores) ? dataScores : [];
            setEventScore(scoresArray);
            setTotalItems(scoresArray.length);
            const calculatedTotalPages = Math.ceil(scoresArray.length / pageSize);
            setTotalPages(calculatedTotalPages);
          }
          
          setLoadingEventScore(false);
        } else if (guildId) {
          console.log("Fetching season scores for guild:", guildId, "season:", seasonId, "page:", currentPage, "pageSize:", pageSize);
          setLoadingSeasonScores(true);
          const dataSeasonScores = await getSeasonScores(guildId, seasonId, currentPage, pageSize);
          
          if (dataSeasonScores && dataSeasonScores.data) {
            setSeasonScores(dataSeasonScores.data || []);
            setTotalItems(dataSeasonScores.total || 0);
            setTotalPages(dataSeasonScores.totalPages || 0);
          } else {
            const scoresArray = Array.isArray(dataSeasonScores) ? dataSeasonScores : [];
            setSeasonScores(scoresArray);
            setTotalItems(scoresArray.length);
            
            const calculatedTotalPages = Math.ceil(scoresArray.length / pageSize);
            setTotalPages(calculatedTotalPages);
          }
          
          setLoadingSeasonScores(false);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError(err.message || "Error desconocido");
        setLoadingEvents(false);
        setLoadingEventScore(false);
        setLoadingSeasonScores(false);
      }
    };
    
    if (seasonId) {
      fetchData();
    }
  }, [seasonId, eventId, guildId, currentPage, pageSize]);

  const refreshEvents = async () => {
    try {
      setError(null);
      setLoadingEvents(true);
      const dataEvents = await getEvents(seasonId);
      setEvents(Array.isArray(dataEvents) ? dataEvents : dataEvents.data || []);
      setLoadingEvents(false);
    } catch (err) {
      console.error("Error refrescando eventos:", err);
      setError(err.message || "Error refrescando eventos");
      setLoadingEvents(false);
    }
  };

  const refreshSeasonScores = async () => {
    if (!guildId) return;
    
    try {
      setError(null);
      setLoadingSeasonScores(true);
      const dataSeasonScores = await getSeasonScores(guildId, seasonId, currentPage, pageSize);
      
      if (dataSeasonScores && dataSeasonScores.data) {
        setSeasonScores(dataSeasonScores.data || []);
        setTotalItems(dataSeasonScores.total || 0);
        setTotalPages(dataSeasonScores.totalPages || 0);
      } else {
        const scoresArray = Array.isArray(dataSeasonScores) ? dataSeasonScores : [];
        setSeasonScores(scoresArray);
        setTotalItems(scoresArray.length);
        const calculatedTotalPages = Math.ceil(scoresArray.length / pageSize);
        setTotalPages(calculatedTotalPages);
      }
      
      setLoadingSeasonScores(false);
    } catch (err) {
      console.error("Error refrescando puntajes de temporada:", err);
      setError(err.message || "Error refrescando puntajes de temporada");
      setLoadingSeasonScores(false);
    }
  };

  const refreshEventScore = async () => {
    if (!eventId) return;
    
    try {
      setError(null);
      setLoadingEventScore(true);
      const dataScores = await getEventScore(eventId, currentPage, pageSize);
      
      if (dataScores && dataScores.data) {
        setEventScore(dataScores.data || []);
        setTotalItems(dataScores.total || 0);
        setTotalPages(dataScores.totalPages || 0);
      } else {
        const scoresArray = Array.isArray(dataScores) ? dataScores : [];
        setEventScore(scoresArray);
        setTotalItems(scoresArray.length);
        const calculatedTotalPages = Math.ceil(scoresArray.length / pageSize);
        setTotalPages(calculatedTotalPages);
      }
      
      setLoadingEventScore(false);
    } catch (err) {
      console.error("Error refrescando puntajes del evento:", err);
      setError(err.message || "Error refrescando puntajes del evento");
      setLoadingEventScore(false);
    }
  };

  const refreshAll = async () => {
    await Promise.all([
      refreshEvents(),
      refreshSeasonScores()
    ]);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return {
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
    refreshEventScore,
    refreshSeasonScores,
    refreshAll,
    goToPage,
    nextPage,
    prevPage,
    changePageSize
  };
};
