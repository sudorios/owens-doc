import { useState } from "react";
import { createEvent } from "../services/services";

export const useEventCreation = (guildId, seasonId, onEventCreated) => {
  const [newEventName, setNewEventName] = useState("");
  const [newEventState, setNewEventState] = useState("pending");
  const [creatingEvent, setCreatingEvent] = useState(false);

  const handleCreateEvent = async () => {
    if (!newEventName.trim()) return;

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
      
      // Reset form
      setNewEventName("");
      setNewEventState("pending");
      
      // Notify parent component
      if (onEventCreated) {
        onEventCreated();
      }
      
      return true;
    } catch (err) {
      console.error("Error creando el evento:", err);
      alert("Error creando el evento");
      return false;
    } finally {
      setCreatingEvent(false);
    }
  };

  const resetForm = () => {
    setNewEventName("");
    setNewEventState("pending");
  };

  return {
    newEventName,
    setNewEventName,
    newEventState,
    setNewEventState,
    creatingEvent,
    handleCreateEvent,
    resetForm
  };
};
