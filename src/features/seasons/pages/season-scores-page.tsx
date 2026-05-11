import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetSeasonScoresQuery } from "../hooks/use-seasons";
import { GuildScoresTable } from "../components/guild-scores-table";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Trophy } from "lucide-react";

const DualSlider = ({ min = 0, max = 10000, step = 100, value, onChange }: any) => {
  const [minVal, maxVal] = value;
  
  const minPos = ((minVal - min) / (max - min)) * 100;
  const maxPos = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="w-full relative h-6 flex items-center">
      <div className="absolute w-full h-1.5 bg-gray-700 rounded-full"></div>
      
      <div 
        className="absolute h-1.5 bg-purple-500 rounded-full"
        style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
      ></div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const val = Math.min(Number(e.target.value), maxVal);
          onChange([val, maxVal]);
        }}
        className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#111] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-400 [&::-webkit-slider-thumb]:rounded-sm cursor-pointer"
        style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const val = Math.max(Number(e.target.value), minVal);
          onChange([minVal, val]);
        }}
        className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[#111] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-400 [&::-webkit-slider-thumb]:rounded-sm cursor-pointer"
        style={{ zIndex: 4 }}
      />
    </div>
  );
};

export const SeasonScoresPage = () => {
  const { guildId, seasonId } = useParams();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const seasonName = localStorage.getItem("seasonName") || "Temporada";

  // Search & Filter State
  const [searchInput, setSearchInput] = useState("");
  const [palabraClave, setPalabraClave] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [tempFilters, setTempFilters] = useState<any>({});

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPalabraClave(searchInput);
      setPage(1); // Reset page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: scoresData, isLoading } = useGetSeasonScoresQuery(
    guildId || "", 
    seasonId || "", 
    page, 
    pageSize,
    palabraClave,
    filters
  );

  const scores = scoresData?.data || [];
  const totalScores = scoresData?.total || 0;
  const totalPages = scoresData?.totalPages || 1;

  const improvements = scores.filter((s: any) => s.lastPosition && s.position < s.lastPosition);
  const declines = scores.filter((s: any) => s.lastPosition && s.position > s.lastPosition);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">
            Clasificación: <span className="text-purple-400">{seasonName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Tabla de posiciones oficial de la temporada.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      {!isLoading && scores.length > 0 && (improvements.length > 0 || declines.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {improvements.length > 0 && (
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
              <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">↑</span> Subidas destacadas
              </h3>
              <div className="space-y-1 text-sm text-green-200/70">
                {improvements.slice(0, 3).map((s: any) => (
                  <div key={s.userId} className="flex justify-between">
                    <span>{s.user.username}</span>
                    <span className="text-green-400">+{s.lastPosition - s.position} puestos</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {declines.length > 0 && (
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <span className="text-xl">↓</span> Bajadas destacadas
              </h3>
              <div className="space-y-1 text-sm text-red-200/70">
                {declines.slice(0, 3).map((s: any) => (
                  <div key={s.userId} className="flex justify-between">
                    <span>{s.user.username}</span>
                    <span className="text-red-400">-{s.position - s.lastPosition} puestos</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table Section */}
      <div>
        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold">Puntajes</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar por usuario..." 
                className="w-full bg-[#111] border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-sm"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white shrink-0 w-full sm:w-auto shadow-sm"
              onClick={() => {
                setTempFilters(filters);
                setIsFilterOpen(true);
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              {Object.keys(filters).length > 0 && (
                <span className="ml-2 w-2 h-2 bg-purple-500 rounded-full"></span>
              )}
            </Button>
          </div>
        </div>

        <GuildScoresTable data={scores as any} isLoading={isLoading} page={page} pageSize={pageSize} />
        
        {/* Pagination */}
        {!isLoading && scores.length > 0 && (
          <div className="p-4 mt-4 border border-gray-700 rounded-xl flex items-center justify-between bg-gray-800 shadow-sm">
            <div className="text-sm text-gray-400">
              Mostrando {scores.length} de {totalScores} usuarios
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-gray-700 bg-transparent hover:bg-gray-700 text-gray-300"
              >
                Anterior
              </Button>
              <span className="text-sm text-gray-400 min-w-[5rem] text-center">
                Página {page} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="border-gray-700 bg-transparent hover:bg-gray-700 text-gray-300"
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Lateral Sidebar overlay */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-400" />
              Filtros
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto pr-2">
            {/* Filter by Order */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Orden</label>
              <div className="flex flex-col gap-2">
                <button 
                  className={`px-4 py-2 text-left text-sm rounded-lg border transition-all ${!tempFilters.sort ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-[#111] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'}`}
                  onClick={() => setTempFilters({ ...tempFilters, sort: undefined })}
                >
                  Por defecto (Mejores primero)
                </button>
                <button 
                  className={`px-4 py-2 text-left text-sm rounded-lg border transition-all ${tempFilters.sort === "ASC" ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-[#111] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'}`}
                  onClick={() => setTempFilters({ ...tempFilters, sort: "ASC" })}
                >
                  Menor a Mayor Puntaje
                </button>
              </div>
            </div>

            {/* Filter by Username */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Nombre de Usuario</label>
              <input 
                type="text" 
                placeholder="Buscar coincidencia exacta..." 
                className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-sm"
                value={tempFilters.username || ""}
                onChange={(e) => setTempFilters({ ...tempFilters, username: e.target.value })}
              />
            </div>

            {/* Filter by Points Range */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Rango de Puntos</label>
                <span className="text-xs text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-1 rounded">
                  {tempFilters.minPoints || 0} - {tempFilters.maxPoints || 10000}
                </span>
              </div>
              
              <div className="px-2 pt-2 pb-1">
                <DualSlider 
                  min={0} 
                  max={10000} 
                  step={100}
                  value={[tempFilters.minPoints || 0, tempFilters.maxPoints || 10000]} 
                  onChange={([min, max]: [number, number]) => setTempFilters({ ...tempFilters, minPoints: min, maxPoints: max })}
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="number" 
                  placeholder="Mín." 
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-sm text-center"
                  value={tempFilters.minPoints || ""}
                  onChange={(e) => setTempFilters({ ...tempFilters, minPoints: e.target.value ? Number(e.target.value) : undefined })}
                />
                <span className="text-gray-500 font-bold">-</span>
                <input 
                  type="number" 
                  placeholder="Máx." 
                  className="w-full bg-[#111] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors shadow-sm text-center"
                  value={tempFilters.maxPoints || ""}
                  onChange={(e) => setTempFilters({ ...tempFilters, maxPoints: e.target.value ? Number(e.target.value) : undefined })}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-800 flex gap-3 mt-auto">
            <Button 
              variant="outline"
              className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white" 
              onClick={() => { setFilters({}); setPage(1); setIsFilterOpen(false); }}
            >
              Limpiar
            </Button>
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" 
              onClick={() => { setFilters(tempFilters); setPage(1); setIsFilterOpen(false); }}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
