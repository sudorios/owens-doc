
import api from "./api";

export const getEvents = async (seasonId) => {
    const res = await api.get(`/api/event?seasonId=${seasonId}`);
    return res.data;
  };
  
  

  export const createEvent = async (data) => {
    const res = await api.post("/api/event", data);
    return res.data;
  }
  