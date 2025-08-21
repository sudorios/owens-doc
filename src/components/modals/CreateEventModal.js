import React from "react";

const CreateEventModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  newEventName, 
  setNewEventName, 
  newEventState, 
  setNewEventState, 
  creatingEvent 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 text-white">
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crear nuevo evento</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Nombre del evento</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Estado</label>
            <select
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              value={newEventState}
              onChange={(e) => setNewEventState(e.target.value)}
              required
            >
              <option value="pending">Pendiente</option>
              <option value="active">Activo</option>
              <option value="finished">Finalizado</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Fecha de inicio</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
              value={new Date().toLocaleString()}
              disabled
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
              disabled={creatingEvent}
            >
              {creatingEvent ? "Creando..." : "Crear"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded font-semibold"
              onClick={onClose}
              disabled={creatingEvent}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
