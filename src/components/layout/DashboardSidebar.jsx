import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Server, 
  Settings, 
  LogOut, 
  Home,
  ChevronLeft,
  ChevronRight,
  Shield,
  Gauge,
  ChevronDown,
  ChevronUp,
  Circle
} from "lucide-react";
import { authService } from "../../features/auth/service/auth.service";
import api from "../../services/api";
import owensIcon from "../../assets/images/owens.png";

const iconMap = {
  "gauge": <Gauge size={20} />,
  "dashboard-panel": <LayoutDashboard size={20} />,
  "server": <Server size={20} />,
  "settings": <Settings size={20} />,
  "shield": <Shield size={20} />,
  "users": <Users size={20} />,
};

const DashboardSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    const localUserStr = localStorage.getItem("user_info");
    if (localUserStr) {
      try {
        setUser(JSON.parse(localUserStr));
      } catch (e) {
        console.error("Error al cargar info de usuario en sidebar");
      }
    }

    const fetchMenu = async () => {
      try {
        const response = await api.get("/api/usuario/loadMenu");
        if (response.data && response.data.menu) {
          setMenuItems(response.data.menu);
        }
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  const toggleMenu = (title) => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderIcon = (iconName, isChild) => {
    if (!iconName) {
      return isChild ? <Circle size={8} className="ml-1" /> : <Circle size={20} />;
    }
    return iconMap[iconName.toLowerCase()] || (isChild ? <Circle size={8} className="ml-1" /> : <Circle size={20} />);
  };

  const renderMenuItem = (item, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.title];
    
    // Determinar si la ruta actual coincide con el item o alguno de sus hijos
    let isActive = false;
    if (item.to) {
      isActive = item.to === "/dashboard" 
        ? location.pathname === "/dashboard"
        : location.pathname.startsWith(item.to);
    } else if (hasChildren) {
      isActive = item.children.some(child => 
        child.to === "/dashboard" 
          ? location.pathname === "/dashboard"
          : child.to && location.pathname.startsWith(child.to)
      );
    }

    // Estilos base
    const baseClasses = `flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 group ${
      isActive && !hasChildren
        ? "bg-gray-800 text-white" 
        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
    } ${isChild ? "py-2 px-6 text-sm" : ""}`;

    const iconColor = isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-400";

    const content = (
      <>
        <span className={`${iconColor} flex items-center justify-center`}>
          {renderIcon(item.icono, isChild)}
        </span>
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <span className="font-medium whitespace-nowrap truncate">{item.title}</span>
            {hasChildren && (
              <span className="text-gray-500 shrink-0">
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            )}
          </div>
        )}
      </>
    );

    if (hasChildren) {
      return (
        <div key={item.title} className="space-y-1">
          <button 
            onClick={() => toggleMenu(item.title)}
            className={`w-full text-left ${baseClasses}`}
          >
            {content}
          </button>
          {/* Renderizado de hijos si está abierto */}
          <div className={`overflow-hidden transition-all duration-300 ${isOpen && !isCollapsed ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            <div className="space-y-1 bg-gray-900/50 rounded-md border-l border-gray-700 ml-6 pl-2">
              {item.children.map(child => renderMenuItem(child, true))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        to={item.to || "#"}
        className={baseClasses}
      >
        {content}
      </Link>
    );
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-700 transition-all duration-300 z-50 flex flex-col ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header del Sidebar */}
      <div className="p-6 flex items-center justify-between border-b border-gray-700 min-h-[88px] shrink-0">
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
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>

      {/* Footer del Sidebar con Perfil de Usuario */}
      <div className="p-4 border-t border-gray-700 space-y-4 shrink-0">
        {/* User Profile Info */}
        <div className={`flex items-center gap-3 px-2 ${isCollapsed ? "justify-center" : ""}`}>
          <img 
            src={user?.avatarUrl || user?.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"} 
            alt="Avatar" 
            className="w-10 h-10 rounded-md border border-gray-600 object-cover shrink-0"
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
            <Home size={18} className="group-hover:text-white shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Ir al Inicio</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-3 py-2.5 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-all group"
          >
            <LogOut size={18} className="group-hover:text-red-400 shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Cerrar Sesión</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

