import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Server, 
  Settings, 
  LogOut, 
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { authService } from "../../features/auth/service/auth.service";
import owensIcon from "../../assets/images/owens.png";

const DashboardSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const localUserStr = localStorage.getItem("user_info");
    if (localUserStr) {
      try {
        setUser(JSON.parse(localUserStr));
      } catch (e) {
        console.error("Error al cargar info de usuario en sidebar");
      }
    }
  }, []);

  const menuItems = [
    { 
      name: "Servidores", 
      path: "/dashboard", 
      icon: <Server size={20} /> 
    },
    { 
      name: "Usuarios", 
      path: "/dashboard/users", 
      icon: <Users size={20} /> 
    },
    { 
      name: "Configuración", 
      path: "/dashboard/settings", 
      icon: <Settings size={20} /> 
    },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-700 transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header del Sidebar */}
      <div className="p-6 flex items-center justify-between border-b border-gray-700 min-h-[88px]">
        {!isCollapsed ? (
          <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <img
              src={owensIcon}
              alt="Owens Icon"
              className="w-10 h-10 object-contain shrink-0"
            />
            <span className="font-extrabold text-xl whitespace-nowrap text-white">Owens-Bot</span>
          </Link>
        ) : (
          <div className="flex justify-center w-full">
            <img
              src={owensIcon}
              alt="Owens Icon"
              className="w-10 h-10 object-contain"
            />
          </div>
        )}
      </div>

      {/* Botón para colapsar */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 bg-gray-800 border border-gray-600 rounded-full p-1 text-gray-400 hover:text-white transition-colors z-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navegación Principal */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
          // Para no marcar "Servidores" si estamos en "Usuarios" (ya que ambos empiezan con /dashboard)
          const isExactActive = item.path === "/dashboard" 
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 group ${
                isExactActive 
                  ? "bg-gray-800 text-white" 
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
              }`}
            >
              <span className={`${isExactActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400"}`}>
                {item.icon}
              </span>
              {!isCollapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer del Sidebar con Perfil de Usuario */}
      <div className="p-4 border-t border-gray-700 space-y-4">
        {/* User Profile Info */}
        <div className={`flex items-center gap-3 px-2 ${isCollapsed ? "justify-center" : ""}`}>
          <img 
            src={user?.avatarUrl || user?.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"} 
            alt="Avatar" 
            className="w-10 h-10 rounded-md border border-gray-600 object-cover"
          />
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate">
                {user?.username || "Admin"}
              </span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                Superadmin
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <Link
            to="/"
            className="flex items-center gap-4 px-3 py-2.5 text-gray-400 hover:bg-gray-800/50 hover:text-white rounded-md transition-all group"
          >
            <Home size={18} className="group-hover:text-white" />
            {!isCollapsed && <span className="text-sm font-medium">Ir al Inicio</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-3 py-2.5 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-all group"
          >
            <LogOut size={18} className="group-hover:text-red-400" />
            {!isCollapsed && <span className="text-sm font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
