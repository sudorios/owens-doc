import { useState, useEffect } from "react";

/**
 * Hook to manage Discord server synchronization via WebSocket.
 * @param {string} userId - The Discord user ID.
 * @param {function} onComplete - Callback when sync is completed.
 * @param {function} onError - Callback when sync fails.
 */
export const useDiscordSync = (userId, onComplete, onError) => {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!userId || userId === "mock_id_temporal") return;

    // Check if we should sync (e.g., if we just logged in)
    const shouldSync = localStorage.getItem("needs_discord_sync") === "true";
    if (!shouldSync) return;

    const wsUrl = `ws://localhost:6699/owens-web-api/ws-sync?userId=${userId}`;
    const socket = new WebSocket(wsUrl);

    setIsSyncing(true);
    console.log("Connecting to WebSocket for sync:", wsUrl);

    socket.onmessage = (event) => {
      console.log("WS Message received:", event.data);
      if (event.data === "COMPLETADO") {
        setIsSyncing(false);
        localStorage.removeItem("needs_discord_sync");
        if (onComplete) onComplete();
        socket.close();
      } else if (event.data === "ERROR") {
        setIsSyncing(false);
        localStorage.removeItem("needs_discord_sync");
        if (onError) onError("Hubo un problema al sincronizar tus servidores de Discord.");
        socket.close();
      }
    };

    socket.onerror = (error) => {
      console.error("WS WebSocket error:", error);
      setIsSyncing(false);
      localStorage.removeItem("needs_discord_sync");
      if (onError) onError("Error de conexión con el servicio de sincronización.");
    };

    socket.onclose = () => {
      console.log("WS WebSocket connection closed.");
      setIsSyncing(false);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [userId, onComplete, onError]);

  return { isSyncing };
};
