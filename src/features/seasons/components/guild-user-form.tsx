import { useState } from "react";
import { useCreateGuildUserMutation } from "../hooks/use-seasons";
import { userService } from "@/features/users/service/user.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GuildUserFormProps {
  guildId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const GuildUserForm = ({ guildId, onSuccess, onCancel }: GuildUserFormProps) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [points, setPoints] = useState(0);
  const [position, setPosition] = useState(0);
  const [role, setRole] = useState("USER");

  const createMutation = useCreateGuildUserMutation(guildId);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.length >= 2) {
      setIsSearching(true);
      try {
        const res = await userService.searchUsers(val);
        setSearchResults(Array.isArray(res) ? res : (res as any).data || []);
      } catch (err) {
        setSearchResults([]);
      }
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    try {
      await createMutation.mutateAsync({
        userId: selectedUser.id || selectedUser.userId,
        role,
        points,
        position,
        lastPosition: position,
      });
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 relative">
        <label className="text-sm font-semibold text-gray-300">Buscar Usuario</label>
        <Input 
          className="bg-gray-800 border-gray-700 text-white" 
          placeholder="Nombre de usuario" 
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length > 0 && !selectedUser && (
          <div className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto mt-1">
            {searchResults.map((u: any) => (
              <div 
                key={u.id} 
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-200"
                onClick={() => {
                  setSelectedUser(u);
                  setQuery(u.username);
                  setSearchResults([]);
                }}
              >
                {u.username}
              </div>
            ))}
          </div>
        )}
        {selectedUser && (
          <p className="text-xs text-green-400">Usuario seleccionado: {selectedUser.username}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-300">Rol</label>
        <select 
          className="w-full flex h-10 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Puntos</label>
          <Input 
            type="number" 
            className="bg-gray-800 border-gray-700 text-white"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            min={0}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-300">Posición</label>
          <Input 
            type="number" 
            className="bg-gray-800 border-gray-700 text-white"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            min={1}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={!selectedUser || createMutation.isPending} className="bg-purple-600 hover:bg-purple-700 text-white">
          {createMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Agregar Usuario"}
        </Button>
      </div>
    </form>
  );
};
