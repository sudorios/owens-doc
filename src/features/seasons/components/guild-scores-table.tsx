import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GuildUser } from "@/domain/models/season.model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface GuildScoresTableProps {
  data: GuildUser[];
  isLoading: boolean;
  page: number;
  pageSize: number;
}

export const GuildScoresTable = ({ data, isLoading, page, pageSize }: GuildScoresTableProps) => {
  const columns = [
    {
      id: "position",
      header: "Posición",
      cell: ({ row }: any) => {
        const score = row.original;
        const lastPosition = score.lastPosition;
        const position = score.position || (((page - 1) * pageSize) + row.index + 1);
        
        let positionChange = null;
        if (lastPosition && position !== lastPosition) {
          const change = lastPosition - position;
          positionChange = {
            change: Math.abs(change),
            isImprovement: change > 0,
            icon: change > 0 ? <ArrowUp className="w-4 h-4 text-green-400" /> : <ArrowDown className="w-4 h-4 text-red-400" />,
            color: change > 0 ? "text-green-400" : "text-red-400"
          };
        }

        return (
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-lg text-gray-200">
              {position}
            </span>
            {positionChange ? (
              <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full border border-gray-800">
                {positionChange.icon}
                <span className={`text-sm font-bold ${positionChange.color}`}>
                  {positionChange.change}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full opacity-50 border border-transparent">
                <Minus className="w-4 h-4 text-gray-500" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "user.username",
      header: "Usuario",
      cell: ({ row }: any) => (
        <span className="font-medium text-gray-300">{row.original.user?.username || "Desconocido"}</span>
      )
    },
    {
      accessorKey: "points",
      header: "Puntos",
      cell: ({ row }: any) => (
        <span className="font-bold text-blue-400 text-lg">{row.original.points}</span>
      )
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-gray-700/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-gray-700 hover:bg-transparent">
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                No hay puntajes disponibles en el servidor.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
