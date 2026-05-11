import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const SeasonLayout = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full text-gray-100 flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 px-6 md:px-8 pb-8 space-y-6 max-w-6xl mx-auto w-full mt-6">
        
        <div className="flex items-center mb-2">
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white hover:bg-transparent -ml-4" 
            onClick={() => navigate(`/dashboard/${guildId}/seasons`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Temporadas
          </Button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};
