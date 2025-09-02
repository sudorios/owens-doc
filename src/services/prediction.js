import api from "./api";

export const getAccuracyByQuestion = async (guildId, eventId, order = "ASC") => {
  try {
    const response = await api.get(
      `/api/predictions/accuracy/${guildId}/${eventId}?order=${order}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching accuracy data:", error);
    throw error;
  }
};

/**
 * Obtiene estadísticas generales de predicción
 * @param {string} guildId - ID del servidor
 * @param {string} seasonId - ID de la temporada
 * @returns {Promise<Object>} Estadísticas de predicción
 */
export const getPredictionStats = async (guildId, seasonId) => {
  try {
    const response = await api.get(`/prediction/stats/${guildId}/${seasonId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction stats:', error);
    throw error;
  }
};