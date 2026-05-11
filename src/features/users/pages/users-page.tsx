import { useState } from "react";
import { useGetUsersQuery } from "../hooks/use-users";
import { UsersTable } from "../components/users-table";
import { UserForm } from "../components/user-form";
import { User } from "@/domain/models/user.model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, Users } from "lucide-react";

export const UsersPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  const { data, isLoading, isError } = useGetUsersQuery(page, pageSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    // TODO: Implementar edición en el formulario
    console.log("Editar usuario:", user);
  };

  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
            </div>
            <p className="text-gray-400 mt-2">
              Gestiona los miembros registrados en el sistema de Owens Docs.
            </p>
          </div>
          <Button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20">
            <UserPlus className="w-4 h-4 mr-2" />
            Agregar Usuario
          </Button>
        </div>

        {isError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
            Hubo un error al cargar los usuarios. Por favor, revisa tu conexión.
          </div>
        )}

        {/* Content */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-1">
            <UsersTable data={users} isLoading={isLoading} onEdit={handleEdit} />
          </div>
          
          {/* Pagination */}
          {!isLoading && users.length > 0 && (
            <div className="p-4 border-t border-gray-800 flex items-center justify-between bg-black/20">
              <div className="text-sm text-gray-400">
                Mostrando {users.length} de {total} usuarios
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300"
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
                  className="border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#111] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Editar Usuario" : "Agregar Usuario"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedUser 
                ? "Modifica los datos del usuario en el sistema." 
                : "Añade un nuevo usuario de Discord al sistema."}
            </DialogDescription>
          </DialogHeader>
          
          <UserForm onSuccess={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
