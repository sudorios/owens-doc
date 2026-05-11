import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { authService } from "../../features/auth/service/auth.service";
import owensIcon from "../../assets/images/owens.png";

const MainLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(() => {
    return window.location.hash.includes("access_token");
  });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const urlParams = new URLSearchParams(hash.replace("#", "?"));
      const discordToken = urlParams.get("access_token");

      if (discordToken) {
        // Limpia la URL para que no se vea el token
        window.history.replaceState(null, "", window.location.pathname);
        
        authService.loginWithDiscord({ token: discordToken })
          .then((res) => {
            console.log("Login exitoso con tu API", res);
            localStorage.setItem("needs_discord_sync", "true");
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("Error en la autenticación:", error);
            setIsAuthenticating(false);
          });
      } else {
        setIsAuthenticating(false);
      }
    }
  }, [navigate]);

  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <img src={owensIcon} alt="Owens" className="w-16 h-16 animate-pulse" />
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium animate-pulse">Autenticando con Discord...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
