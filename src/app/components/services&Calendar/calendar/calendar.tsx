import React, { useState, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
  SlotInfo,
  View,
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
import { Disponibilidad } from "@/app/types/types";
import { RootState } from "@/redux/store";
import ReserveModal from "../../reservas/ReservationModal";
import Modal from "../../modal/modal"; 

moment.tz.setDefault("America/Argentina/Buenos_Aires");
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango.",
  showMore: (total: number) => `+ Ver más (${total})`,
};

interface MyCalendarProps {
  isAdmin: boolean;
  servicioId: number;
  closeParentModal: () => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({
  servicioId,
  closeParentModal,
}) => {
  const dispatch = useAppDispatch();
  const disponibilidades = useAppSelector(
    (state: RootState) => state.disponibilidad.disponibilidades
  );
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDisponibilidad, setSelectedDisponibilidad] =
    useState<Disponibilidad | null>(null);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false); 

  useEffect(() => {
    dispatch(fetchDisponibilidadesByService(servicioId));
  }, [dispatch, servicioId, currentDate]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (
      user?.roles.some(
        (role) => typeof role === "object" && role.nombre === "admin"
      ) &&
      currentView === "day"
    ) {
      const start = moment(slotInfo.start).toISOString();
      const end = moment(slotInfo.end).toISOString();

      const disponibilidadToSave = {
        servicio_id: servicioId,
        fecha_inicio: start,
        fecha_fin: end,
        disponible: true,
        servicio_nombre: "Nombre del servicio",
        servicio_precio: 100, 
      };


      dispatch(addDisponibilidad(disponibilidadToSave)).then(() => {
        dispatch(fetchDisponibilidadesByService(servicioId));
      });
    }
  };

  const handleSelectEvent = (event: Disponibilidad) => {
    if (
      user?.roles.some(
        (role) => typeof role === "object" && role.nombre === "admin"
      ) &&
      currentView === "day"
    ) {
      // Ajustamos el tiempo sumando 3 horas para corregir el desfase también en el modal de admin
      const adjustedEvent = {
        ...event,
        fecha_inicio: moment(event.fecha_inicio).add(3, "hours").toISOString(),
        fecha_fin: moment(event.fecha_fin).add(3, "hours").toISOString(),
      };
      setSelectedDisponibilidad(adjustedEvent);
      setIsAdminModalOpen(true);
    } else {
      const adjustedEvent = {
        ...event,
        fecha_inicio: moment(event.fecha_inicio).add(3, "hours").toISOString(),
        fecha_fin: moment(event.fecha_fin).add(3, "hours").toISOString(),
      };
      setSelectedDisponibilidad(adjustedEvent);
      setIsReserveModalOpen(true);
    }
  };

  const handleDeleteDisponibilidad = () => {
    if (selectedDisponibilidad && selectedDisponibilidad.id) {
      dispatch(deleteDisponibilidad(selectedDisponibilidad.id)).then(() => {
        setSelectedDisponibilidad(null); // Limpiamos la selección
        setIsAdminModalOpen(false); // Cierra el modal después de eliminar
        dispatch(fetchDisponibilidadesByService(servicioId));
      });
    }
  };

  const handleReserveDisponibilidad = () => {
    if (selectedDisponibilidad && selectedDisponibilidad.id) {
      const updatedDisponibilidad: Disponibilidad = {
        ...selectedDisponibilidad,
        servicio_id: selectedDisponibilidad.servicio_id || servicioId, // Asegura que servicio_id esté presente
        disponible: false, // Cambiamos a false para marcar como reservada
      };

   

      dispatch(updateDisponibilidad(updatedDisponibilidad))
        .then(() => {
          alert("Reserva realizada con éxito");
          setSelectedDisponibilidad(null); // Limpiamos la selección
          setIsAdminModalOpen(false); // Cierra el modal después de reservar
          dispatch(fetchDisponibilidadesByService(servicioId)); // Refrescamos la lista de disponibilidades
        })
        .catch((error) => {
          console.error("Error al reservar la disponibilidad", error);
        });
    }
  };

  const handleCloseReserveModal = () => {
    setIsReserveModalOpen(false);
    setSelectedDisponibilidad(null); // Limpiamos la selección después de cerrar el modal
  };

  const handleCloseAdminModal = () => {
    setIsAdminModalOpen(false);
    setSelectedDisponibilidad(null); // Limpiamos la selección después de cerrar el modal
  };

  // Ajuste para la visualización en el calendario
  const events = disponibilidades
    .filter((disp) => disp.disponible)
    .map((disp) => ({
      ...disp,
      start: moment(disp.fecha_inicio).add(3, "hours").toDate(),
      end: moment(disp.fecha_fin).add(3, "hours").toDate(),
    }));

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

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
          selectable={user?.roles?.some((role) => {
            if (typeof role === "string") {
              return role === "admin";
            } else {
              return role.nombre === "admin";
            }
          })}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={handleNavigate}
          messages={messages}
        />
      </CalendarContainer>

      {/* Modal para confirmar reserva solo visible para usuarios no admin */}
      {selectedDisponibilidad &&
        user?.roles?.some((role) => {
          if (typeof role === "string") {
            return role === "admin";
          } else {
            return role.nombre === "admin";
          }
        }) && (
          <ReserveModal
            disponibilidad={selectedDisponibilidad}
            isOpen={isReserveModalOpen}
            onClose={handleCloseReserveModal}
            closeParentModal={closeParentModal}
          />
        )}

      {/* Modal para opciones de admin: Eliminar o Reservar */}
      {selectedDisponibilidad &&
        user?.roles?.some((role) => {
          if (typeof role === "string") {
            return role === "admin";
          } else {
            return role.nombre === "admin";
          }
        }) && (
          <Modal
            title="Opciones de Disponibilidad"
            isOpen={isAdminModalOpen}
            onClose={handleCloseAdminModal}
            actions={[
              { label: "Eliminar", handler: handleDeleteDisponibilidad },
              { label: "Reservar", handler: handleReserveDisponibilidad }, // Mismo flujo de reserva que los usuarios
              { label: "Cerrar", handler: handleCloseAdminModal },
            ]}
          >
            <p>¿Qué te gustaría hacer con esta disponibilidad?</p>
            <p>Servicio: {selectedDisponibilidad.servicio_nombre}</p>
            <p>
              Desde: {moment(selectedDisponibilidad.fecha_inicio).format("LLL")}
            </p>
            <p>
              Hasta: {moment(selectedDisponibilidad.fecha_fin).format("LLL")}
            </p>
          </Modal>
        )}
    </div>
  );
};

export default MyCalendar;
