import React, { useEffect } from "react";

const AddUserModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  setFormData,
  isSubmitting = false,
  message = { type: "", text: "" },
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
  selectedUser,
  onSearchUsers,
  onSelectUser,
  onClearSearch
}) => {
  useEffect(() => {
    if (!isOpen) return;
    
    const timeoutId = setTimeout(() => {
      if (searchQuery && searchQuery.length >= 2) {
        onSearchUsers(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearchUsers, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para manejar la selección de usuario
  const handleUserSelection = (user) => {
    onSelectUser(user);
    // Limpiar el campo de búsqueda después de seleccionar
    setSearchQuery("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 text-white">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Agregar Puntaje de Usuario</h2>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === "success" 
              ? "bg-green-900 border border-green-700 text-green-200" 
              : "bg-red-900 border border-red-700 text-red-200"
          }`}>
            <p className="text-sm">{message.text}</p>
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Buscar Usuario</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={selectedUser ? "Usuario seleccionado" : "Escribe el nombre del usuario..."}
                required
                disabled={selectedUser}
              />
              {selectedUser && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white"
                  title="Limpiar selección"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Solo mostrar resultados si no hay usuario seleccionado */}
            {!selectedUser && searchResults.length > 0 && (
              <div className="mt-2 max-h-32 overflow-y-auto bg-gray-800 rounded border border-gray-700">
                {searchResults.map((user) => (
                  <div
                    key={user.id || user.userId}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                    onClick={() => handleUserSelection(user)}
                  >
                    <div className="text-white font-medium">
                      {user.username || user.name || "Usuario"}
                    </div>
                    {user.email && (
                      <div className="text-gray-400 text-sm">{user.email}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Usuario seleccionado */}
            {selectedUser && (
              <div className="mt-2 p-2 bg-blue-900 border border-blue-700 rounded">
                <div className="text-blue-200 text-sm font-medium">
                  Usuario seleccionado: {selectedUser.username || selectedUser.name}
                </div>
                <div className="text-blue-300 text-xs">
                  ID: {selectedUser.id || selectedUser.userId}
                </div>
              </div>
            )}
            
            {/* Estado de búsqueda - solo si no hay usuario seleccionado */}
            {!selectedUser && isSearching && (
              <div className="mt-2 text-gray-400 text-sm">
                🔍 Buscando usuarios...
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Puntos Totales</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              value={formData.totalPoints || ""}
              onChange={(e) => handleInputChange("totalPoints", Number(e.target.value))}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Posición</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              value={formData.position || ""}
              onChange={(e) => handleInputChange("position", Number(e.target.value))}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Última Posición</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              value={formData.lastPosition || ""}
              onChange={(e) => handleInputChange("lastPosition", Number(e.target.value))}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold disabled:opacity-50"
              disabled={isSubmitting || !selectedUser}
            >
              {isSubmitting ? "Agregando..." : "Agregar"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
