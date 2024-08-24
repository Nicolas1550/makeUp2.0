import React, { useState, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
  SlotInfo,
  View,
  NavigateAction,
} from "react-big-calendar";
import moment from "moment";
import "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarContainer } from "./calendarStyled";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addDisponibilidad,
  deleteDisponibilidad,
  fetchDisponibilidadesByService,
  updateDisponibilidad,
} from "@/redux/features/disponibilidad/disponibilidadSlice";
import { Disponibilidad, NewDisponibilidad } from "@/app/types/types";
import Modal from "../../modal/modal";
import { Button, FormContainer } from "../../modal/modalStyled";
import { RootState } from "@/redux/store";
import ReserveModal from "../../reservas/ReservationModal";

moment.tz.setDefault("America/Argentina/Buenos_Aires");
const localizer = momentLocalizer(moment);

interface MyCalendarProps {
  isAdmin: boolean;
  servicioId: number;
  closeParentModal: () => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({
  isAdmin,
  servicioId,
  closeParentModal,
}) => {
  const dispatch = useAppDispatch();
  const disponibilidades = useAppSelector(
    (state: RootState) => state.disponibilidad.disponibilidades
  );
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [selectedEvent, setSelectedEvent] = useState<Disponibilidad | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDisponibilidad, setNewDisponibilidad] = useState<NewDisponibilidad>(
    {
      servicio_id: servicioId,
      fecha_inicio: "",
      fecha_fin: "",
      disponible: true,
    }
  );
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState(new Date()); // Estado para la fecha actual
  const [isMounted, setIsMounted] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDisponibilidadesByService(servicioId));
  }, [dispatch, servicioId, currentDate]); // Recargar los datos cuando cambia la fecha

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filtrar las disponibilidades no reservadas (disponibles)
  const events = disponibilidades
    .filter((disp) => disp.disponible)
    .map((disp) => ({
      ...disp,
      start: new Date(disp.fecha_inicio),
      end: new Date(disp.fecha_fin),
      allDay: false,
    }));

  const handleSelectEvent = (event: Disponibilidad) => {
    if (user?.role === "admin") {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(event);
      setIsReserveModalOpen(true);
    }
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    // Al seleccionar un slot en la vista de "mes", cambiar la vista a "día" y establecer la fecha seleccionada
    if (currentView === "month") {
      setCurrentDate(slotInfo.start); // Establecer la fecha seleccionada como la fecha actual
      setCurrentView("day"); // Cambiar a la vista de día
    } else if (user?.role === "admin") {
      setNewDisponibilidad({
        ...newDisponibilidad,
        fecha_inicio: slotInfo.start.toISOString(), // Sin manipulación de moment
        fecha_fin: slotInfo.end.toISOString(), // Sin manipulación de moment
      });
      setShowAddModal(true);
    }
  };

  const closeModal = () => setSelectedEvent(null);

  const handleAddDisponibilidad = () => {
    dispatch(addDisponibilidad(newDisponibilidad as Disponibilidad)).then(
      () => {
        dispatch(fetchDisponibilidadesByService(servicioId));
      }
    );
    setShowAddModal(false);
  };

  const handleDeleteDisponibilidad = (id: number) => {
    dispatch(deleteDisponibilidad(id)).then(() => {
      dispatch(fetchDisponibilidadesByService(servicioId));
    });
    setSelectedEvent(null);
  };

  const handleUpdateDisponibilidad = () => {
    if (selectedEvent) {
      dispatch(
        updateDisponibilidad({
          ...selectedEvent,
          title: selectedEvent.title,
          start: new Date(selectedEvent.fecha_inicio),
          end: new Date(selectedEvent.fecha_fin),
        })
      ).then(() => {
        dispatch(fetchDisponibilidadesByService(servicioId));
      });
      setSelectedEvent(null);
    }
  };

  const handleCloseReserveModal = () => {
    setIsReserveModalOpen(false);
    setSelectedEvent(null);
  };

  // Controla la navegación (next, back)
  const handleNavigate = (date: Date, view: View, action: NavigateAction) => {
    setCurrentDate(date); // Actualiza la fecha actual según la navegación
  };

  if (!isMounted) return null;

  return (
    <div>
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          style={{ height: "100%" }}
          onSelectEvent={handleSelectEvent}
          selectable={user?.role === "admin"}
          onSelectSlot={handleSelectSlot}
          view={currentView}
          onView={setCurrentView}
          date={currentDate} // Pasa la fecha actual
          onNavigate={handleNavigate} // Manejador de la navegación
        />
      </CalendarContainer>

      {user?.role === "admin" && (
        <Button onClick={() => setShowAddModal(true)}>
          Agregar Disponibilidad
        </Button>
      )}

      {selectedEvent && user?.role === "admin" && (
        <Modal
          title="Detalles del Evento"
          onClose={closeModal}
          actions={[
            {
              label: "Guardar Cambios",
              handler: handleUpdateDisponibilidad,
            },
            {
              label: "Eliminar",
              handler: () => handleDeleteDisponibilidad(selectedEvent.id),
            },
            { label: "Cerrar", handler: closeModal },
          ]}
        >
          <FormContainer>
            <label>Servicio ID:</label>
            <input type="number" value={selectedEvent.servicio_id} readOnly />
            <label>Fecha y Hora de Inicio:</label>
            <input
              type="datetime-local"
              value={selectedEvent.fecha_inicio.slice(0, 16)} // Formato ISO compatible con datetime-local
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  fecha_inicio: e.target.value,
                })
              }
            />
            <label>Fecha y Hora de Fin:</label>
            <input
              type="datetime-local"
              value={selectedEvent.fecha_fin.slice(0, 16)} // Formato ISO compatible con datetime-local
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  fecha_fin: e.target.value,
                })
              }
            />
            <label>Disponible:</label>
            <input
              type="checkbox"
              checked={selectedEvent.disponible}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  disponible: e.target.checked,
                })
              }
            />
          </FormContainer>
        </Modal>
      )}

      {selectedEvent && user?.role !== "admin" && (
        <ReserveModal
          disponibilidad={selectedEvent}
          isOpen={isReserveModalOpen}
          onClose={handleCloseReserveModal}
          closeParentModal={closeParentModal}
        />
      )}

      {showAddModal && (
        <Modal
          title="Agregar Disponibilidad"
          onClose={() => setShowAddModal(false)}
          actions={[
            { label: "Agregar", handler: handleAddDisponibilidad },
            { label: "Cerrar", handler: () => setShowAddModal(false) },
          ]}
        >
          <FormContainer>
            <label>Fecha y Hora de Inicio:</label>
            <input
              type="datetime-local"
              value={newDisponibilidad.fecha_inicio.slice(0, 16)}
              onChange={(e) =>
                setNewDisponibilidad({
                  ...newDisponibilidad,
                  fecha_inicio: e.target.value,
                })
              }
            />
            <label>Fecha y Hora de Fin:</label>
            <input
              type="datetime-local"
              value={newDisponibilidad.fecha_fin.slice(0, 16)}
              onChange={(e) =>
                setNewDisponibilidad({
                  ...newDisponibilidad,
                  fecha_fin: e.target.value,
                })
              }
            />
            <label>Disponible:</label>
            <input
              type="checkbox"
              checked={newDisponibilidad.disponible}
              onChange={(e) =>
                setNewDisponibilidad({
                  ...newDisponibilidad,
                  disponible: e.target.checked,
                })
              }
            />
          </FormContainer>
        </Modal>
      )}
    </div>
  );
};

export default MyCalendar;
