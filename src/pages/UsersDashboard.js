import React, { useState, useEffect, useCallback } from "react";
import { HiUserAdd, HiXCircle, HiUsers, HiPencil } from "react-icons/hi";
import { getAllUser, createUser } from "../services/user";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    total: 0,
    isFirstLoad: true,
  });
  const [newUser, setNewUser] = useState({
    userId: "",
    username: "",
  });

  const fetchUsers = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const pageNumber = page || 1;
        
        const response = await getAllUser(pageNumber, pagination.pageSize);
        
        if (response && response.data) {
          setUsers(response.data);
          setPagination(prev => ({
            ...prev,
            currentPage: pageNumber,
            pageSize: response.pageSize || prev.pageSize,
            totalPages: Math.ceil(response.total / (response.pageSize || prev.pageSize)),
            total: response.total,
            isFirstLoad: false,
          }));
        }
      } catch (err) {
        setError("Error al cargar los usuarios");
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [pagination.pageSize]
  );

  useEffect(() => {
    if (pagination.isFirstLoad) {
      fetchUsers(1);
    }
  }, [fetchUsers, pagination.isFirstLoad]);

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedUser(null);
    setNewUser({ userId: "", username: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setNewUser({ userId: user.userId, username: user.username });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedUser(null);
    setNewUser({ userId: "", username: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isEditing) {
        try {
          await createUser(newUser);
          await fetchUsers(1);
          handleCloseModal();
          setError(null);
        } catch (err) {
          if (err.response && err.response.status === 409) {
            setError(err.response.data.error || "El usuario ya existe.");
          } else {
            setError(
              "Error al crear el usuario. Por favor, inténtelo de nuevo."
            );
          }
          console.error("Error creating user:", err);
        }
      } else {
        console.log("Actualizar usuario:", newUser);
        handleCloseModal();
      }
    } catch (err) {
      setError("Error inesperado. Por favor, inténtelo de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A132F] to-[#251B3D] p-8 text-white mt-20">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 max-w-5xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3">
                <HiUsers className="w-8 h-8 text-purple-400" />
                <h1 className="text-3xl font-bold tracking-wide">
                  Lista de Usuarios
                </h1>
              </div>
              <p className="text-gray-400 mt-2 ml-11">
                Gestión de los miembros registrados en el sistema
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium shadow-lg transition duration-200 ease-in-out flex items-center gap-2 hover:scale-105"
            >
              <HiUserAdd className="w-5 h-5" />
              Agregar Usuario
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900/50 text-gray-300">
                <tr className="border-b border-gray-700/50">
                  <th className="px-4 py-3 font-semibold">Discord ID</th>
                  <th className="px-4 py-3 font-semibold">Nombre de Usuario</th>
                  <th className="px-4 py-3 font-semibold text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-400">
                          Cargando usuarios...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : !Array.isArray(users) || users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-gray-400 py-8 border-t border-gray-700/50"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <HiUsers className="w-8 h-8 text-gray-500" />
                        No hay usuarios registrados
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <td className="px-4 py-2 border-t border-gray-700/50">
                        {user.userId}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-700/50">
                        {user.username}
                      </td>
                      <td className="px-4 py-2 border-t border-gray-700/50">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 rounded-lg transition duration-200 flex items-center gap-1.5"
                            title="Editar usuario"
                          >
                            <HiPencil className="w-4 h-4" />
                            <span className="text-sm">Editar</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="mt-3 flex items-center justify-between border-t border-gray-700/50 pt-3">
              <div className="text-xs text-gray-400">
                Mostrando {users.length} de {pagination.total} usuarios
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const prevPage = Math.max(1, pagination.currentPage - 1);
                    fetchUsers(prevPage);
                  }}
                  disabled={pagination.currentPage === 1}
                  className={`px-2 py-1 rounded-md text-xs ${
                    pagination.currentPage === 1
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Anterior
                </button>
                <span className="text-xs text-gray-400">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </span>
                <button
                  onClick={() => {
                    const nextPage = pagination.currentPage + 1;
                    fetchUsers(nextPage);
                  }}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className={`px-2 py-1 rounded-md text-xs ${
                    pagination.currentPage >= pagination.totalPages
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {isEditing ? "Editar Usuario" : "Agregar Usuario"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-300"
              >
                <HiXCircle className="w-6 h-6" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Discord ID
                </label>
                <input
                  type="text"
                  value={newUser.userId}
                  onChange={(e) =>
                    setNewUser({ ...newUser, userId: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 border-none"
                  placeholder="Ej: 410835225464143883"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 border-none"
                  placeholder="Nombre de usuario de Discord"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersDashboard;
