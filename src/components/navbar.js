import { Link, useLocation } from "react-router-dom";
import { FaDiscord, FaGithub, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import owensIcon from "../assets/images/owens.png";

import React, { useEffect } from "react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isDashboard) {
      fetch("http://localhost:3000/api/auth/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    }
  }, [isDashboard]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-4 md:px-8 py-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={owensIcon}
            alt="Owens Icon"
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <span className="font-extrabold text-xl md:text-2xl">Owens-Bot</span>
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl hover:text-red-400 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`
            fixed md:static top-16 left-0 w-full md:w-auto
            bg-gray-900 md:bg-transparent
            border-b md:border-none border-gray-700
            ${isMenuOpen ? "block" : "hidden md:flex"}
            md:flex md:items-center md:gap-6
            p-4 md:p-0
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-base font-semibold items-center">
            {isDashboard ? (
              <>
                {user && (
                  <div className="flex items-center gap-2 ml-6">
                    <span className="font-bold text-lg text-white">
                      {user.username}
                    </span>
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 md:gap-6">
                  <Link
                    to="/docs"
                    className="hover:text-red-400 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("navbar.docs")}
                  </Link>
                  <a
                    href="http://localhost:3000/api/auth/discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition"
                  >
                    <FaDiscord className="inline mr-1" /> Discord
                  </a>
                  <a
                    href="https://github.com/sudorios/owens-doc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition"
                  >
                    <FaGithub className="inline mr-1" /> Github
                  </a>
                  <a
                    href="https://discord.com/oauth2/authorize?client_id=1372312475533316190&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify+email+guilds"
                    className="hover:text-green-400 transition flex items-center gap-1"
                  >
                    <FaUser className="inline" /> Login
                  </a>
                  <select
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 ml-2"
                  >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
