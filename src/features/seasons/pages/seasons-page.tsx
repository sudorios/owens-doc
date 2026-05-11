import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSeasonsQuery } from "../hooks/use-seasons";
import { SeasonForm } from "../components/season-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trophy, Calendar, CalendarDays, Pencil, Power, CheckCircle, Search, Filter, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce"; // We may or may not have this, I will just use standard debounce or inline logic.

export const SeasonsPage = () => {
  const { guildId } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Search & Filter State
  const [searchInput, setSearchInput] = useState("");
  const [palabraClave, setPalabraClave] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ active?: boolean }>({});
  const [tempFilters, setTempFilters] = useState<{ active?: boolean }>({});

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPalabraClave(searchInput);
      setPage(1); // Reset page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: seasonsData, isLoading: loadingSeasons } = useGetSeasonsQuery(
    guildId || "", 
    page, 
    pageSize, 
    palabraClave, 
    filters
  );

  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);

  if (!guildId) return null;

  const seasons = seasonsData?.data || [];
  const totalSeasons = seasonsData?.total || 0;
  const totalPages = seasonsData?.totalPages || 1;
  const guildName = seasons.length > 0 ? seasons[0].guild?.name : "Unknown Guild";

  const columns = [
    {
      id: "index",
      header: "Nº",
      cell: ({ row }: any) => {
        const currentIndex = (page - 1) * pageSize + row.index + 1;
        return <span className="font-bold text-gray-400">{currentIndex}</span>;
      }
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: any) => (
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            title="Ver puntaje"
            className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
            onClick={(e) => {
              e.stopPropagation();
              localStorage.setItem("seasonName", row.original.name);
              navigate(`/dashboard/${guildId}/seasons/${row.original.id}`);
            }}
          >
            <Trophy className="w-4 h-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            title="Ver eventos"
            className="h-8 w-8 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
            onClick={(e) => {
              e.stopPropagation();
              localStorage.setItem("seasonName", row.original.name);
              navigate(`/dashboard/${guildId}/seasons/${row.original.id}/events`);
            }}
          >
            <CalendarDays className="w-4 h-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            title="Editar temporada"
            className="h-8 w-8 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Editar temporada", row.original.id);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            title={row.original.active ? "Inactivar temporada" : "Activar temporada"}
            className={`h-8 w-8 ${row.original.active ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" : "text-green-400 hover:text-green-300 hover:bg-green-500/10"}`}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Toggle estado", row.original.id);
            }}
          >
            {row.original.active ? <Power className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          </Button>
        </div>
      )
    },
    {
      accessorKey: "name",
      header: "Nombre de Temporada",
      cell: ({ row }: any) => (
        <span className="font-bold text-gray-200">{row.original.name}</span>
      )
    },
    {
      accessorKey: "startDate",
      header: "Fecha Inicio",
      cell: ({ row }: any) => {
        const date = row.original.startDate ? new Date(row.original.startDate) : null;
        return (
          <span className="text-gray-300">
            {date ? date.toLocaleDateString() : "-"}
          </span>
        );
      }
    },
    {
      accessorKey: "endDate",
      header: "Fecha Fin",
      cell: ({ row }: any) => {
        const date = row.original.endDate ? new Date(row.original.endDate) : null;
        return (
          <span className="text-gray-300">
            {date ? date.toLocaleDateString() : "-"}
          </span>
        );
      }
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.original.active ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
          {row.original.active ? "Activo" : "Inactivo"}
        </span>
      )
    }
  ];

  const table = useReactTable({
    data: seasons,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const applyFilters = () => {
    setFilters(tempFilters);
    setPage(1);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setTempFilters({});
    setFilters({});
    setPage(1);
    setIsFilterOpen(false);
  };

  return (
    <div className="space-y-6 text-gray-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-400" />
            Temporadas del servidor: <span className="text-purple-400">{guildName}</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Administra las temporadas y sus tablas de posiciones.
          </p>
        </div>
        <Button onClick={() => setIsSeasonModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white shrink-0 shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Temporada
        </Button>
      </div>

      {/* Seasons Table Section */}
      <div className="pt-2">
        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold">Listado de Temporadas</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar por palabra clave..." 
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

        <div className="rounded-xl border border-gray-700 bg-gray-800 overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-gray-700/50 border-b border-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-gray-300 font-semibold py-4 text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loadingSeasons ? (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex justify-center items-center gap-3 text-gray-400">
                      <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      Buscando temporadas...
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("seasonName", row.original.name);
                      navigate(`/dashboard/${guildId}/seasons/${row.original.id}`);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={columns.length} className="h-32 text-center text-gray-400">
                    No se encontraron temporadas con los filtros actuales.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loadingSeasons && seasons.length > 0 && (
          <div className="p-4 mt-4 border border-gray-700 rounded-xl flex items-center justify-between bg-gray-800 shadow-sm">
            <div className="text-sm text-gray-400">
              Mostrando {seasons.length} de {totalSeasons} resultados
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

      {/* Modals and Sidebars */}
      <Dialog open={isSeasonModalOpen} onOpenChange={setIsSeasonModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Crear nueva temporada</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ingresa los detalles para iniciar una nueva temporada en el servidor.
            </DialogDescription>
          </DialogHeader>
          <SeasonForm guildId={guildId || ""} onSuccess={() => setIsSeasonModalOpen(false)} onCancel={() => setIsSeasonModalOpen(false)} />
        </DialogContent>
      </Dialog>

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
            
            {/* Filter by Status */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Estado</label>
              <div className="flex flex-col gap-2">
                <button 
                  className={`px-4 py-2 text-left text-sm rounded-lg border transition-all ${tempFilters.active === undefined ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-[#111] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'}`}
                  onClick={() => setTempFilters({ ...tempFilters, active: undefined })}
                >
                  Todos los estados
                </button>
                <button 
                  className={`px-4 py-2 text-left text-sm rounded-lg border transition-all ${tempFilters.active === true ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'bg-[#111] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'}`}
                  onClick={() => setTempFilters({ ...tempFilters, active: true })}
                >
                  Solo Activos
                </button>
                <button 
                  className={`px-4 py-2 text-left text-sm rounded-lg border transition-all ${tempFilters.active === false ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'bg-[#111] border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'}`}
                  onClick={() => setTempFilters({ ...tempFilters, active: false })}
                >
                  Solo Inactivos
                </button>
              </div>
            </div>

            {/* Placeholder for more filters */}
            <div className="space-y-3 pt-4 border-t border-gray-800/50">
              <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Fechas (Próximamente)</label>
              <p className="text-xs text-gray-500">Los filtros de rango de fechas estarán disponibles en la próxima actualización.</p>
            </div>

          </div>
          
          <div className="pt-6 border-t border-gray-800 flex gap-3 mt-auto">
            <Button 
              variant="outline"
              className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white" 
              onClick={clearFilters}
            >
              Limpiar
            </Button>
            <Button 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" 
              onClick={applyFilters}
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
