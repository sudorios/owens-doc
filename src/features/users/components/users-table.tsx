import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@/domain/models/user.model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface UsersTableProps {
  data: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
}

export const UsersTable = ({ data, isLoading, onEdit }: UsersTableProps) => {
  const columns = [
    {
      accessorKey: "userId",
      header: "Discord ID",
    },
    {
      accessorKey: "username",
      header: "Nombre de Usuario",
    },
    {
      id: "actions",
      header: () => <div className="text-center">Acciones</div>,
      cell: ({ row }: any) => {
        const user = row.original;
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border-0">
      <Table>
        <TableHeader className="bg-gray-900/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-gray-800 hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-gray-400 font-semibold">
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
                data-state={row.getIsSelected() && "selected"}
                className="border-gray-800 hover:bg-gray-800/30 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                No hay usuarios registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
