import React from "react";

const UsersModal = ({ isOpen, onClose, participants, loadingParticipants }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Usuarios participantes</h2>
        <div className="mb-4">
          {loadingParticipants ? (
            <span className="text-gray-400">Cargando usuarios...</span>
          ) : participants.length === 0 ? (
            <span className="text-gray-400">No hay usuarios registrados.</span>
          ) : (
            <ul className="list-disc pl-5">
              {participants.map((user) => (
                <li key={user.id} className="mb-2 text-white">
                  {user.username || user.userId}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersModal;
