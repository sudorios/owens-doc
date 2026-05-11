import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Bell, Search, ChevronRight, Home } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Lógica para el título de la página
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/users")) return "Gestión de Usuarios";
    if (path.includes("/settings")) return "Configuración";
    if (path.includes("/seasons")) return "Temporadas";
    if (path.includes("/events")) return "Eventos";
    return "Panel Principal";
  };

  // Lógica para generar los Breadcrumbs
  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const guildName = localStorage.getItem("guildName") || "Servidor";

    return pathnames.map((value, index) => {
      const last = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;

      // Mapeo de nombres para que se vean bonitos
      let displayName = value.charAt(0).toUpperCase() + value.slice(1);
      if (value === "dashboard") displayName = "Panel";
      if (value === "seasons") displayName = "Temporadas";
      if (value === "users") displayName = "Usuarios";
      if (value === "settings") displayName = "Configuración";

      // Si el valor parece un ID de Discord (número largo), usamos el nombre del servidor
      if (!isNaN(value) && value.length > 15) {
        displayName = guildName;
      }

      return { name: displayName, to, last };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-900 flex text-white overflow-hidden font-sans">
      {/* Sidebar Fijo */}
      <DashboardSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Contenedor Derecho (Header + Contenido) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 h-screen ${isCollapsed ? "ml-20" : "ml-64"
          }`}
      >
        {/* Top Header */}
        <header className="h-[100px] bg-gray-900 border-b border-gray-700 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <div className="flex flex-col gap-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
              </Link>
              {breadcrumbs.map((bc, idx) => (
                <div key={bc.to} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  {bc.last ? (
                    <span className="text-gray-300 font-medium">{bc.name}</span>
                  ) : (
                    <Link to={bc.to} className="hover:text-blue-400 transition-colors">
                      {bc.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <h2 className="text-2xl font-bold text-gray-100 tracking-tight">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-gray-800 border border-gray-700 text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors w-64 text-gray-200"
              />
            </div>
            <button className="p-2 relative text-gray-400 hover:text-white transition-colors bg-gray-800 border border-gray-700 rounded-md">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            </button>
          </div>
        </header>

        {/* Área de Contenido con Scroll Propio */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
