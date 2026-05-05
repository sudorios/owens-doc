import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, CalendarDays, Award, Plus, ArrowLeft } from "lucide-react";
import { EventForm } from "@/features/events/components/event-form";

export const SeasonLayout = () => {
  const { guildId, seasonId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const navItems = [
    { label: "Clasificación", path: `/dashboard/${guildId}/seasons/${seasonId}`, icon: Trophy, exact: true },
    { label: "Eventos", path: `/dashboard/${guildId}/seasons/${seasonId}/events`, icon: CalendarDays },
    { label: "Ganadores", path: `/dashboard/${guildId}/seasons/${seasonId}/winners`, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col md:flex-row pt-16">
      <aside className="w-full md:w-64 bg-[#111] border-r border-gray-800 p-6 flex flex-col gap-6 h-auto md:min-h-[calc(100vh-64px)] shrink-0">
        <Button 
          variant="ghost" 
          className="justify-start text-gray-400 hover:text-white mb-2" 
          onClick={() => navigate(`/dashboard/${guildId}/seasons`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Temporadas
        </Button>
        
        <div>
          <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Navegación</h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);
              
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? "bg-purple-500/10 text-purple-400" 
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-gray-800 mt-auto md:mt-4">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsEventModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>

      <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Crear nuevo evento</DialogTitle>
          </DialogHeader>
          <EventForm 
            guildId={guildId || ""} 
            seasonId={seasonId || ""} 
            onSuccess={() => setIsEventModalOpen(false)} 
            onCancel={() => setIsEventModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
