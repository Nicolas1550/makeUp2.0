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
} from "@/redux/features/disponibilidad/disponibilidadSlice";
import { Disponibilidad } from "@/app/types/types";
import { RootState } from "@/redux/store";

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
  isAdmin,
  servicioId,
  closeParentModal,
}) => {
  const dispatch = useAppDispatch();
  const disponibilidades = useAppSelector(
    (state: RootState) => state.disponibilidad.disponibilidades
  );
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDisponibilidad, setSelectedDisponibilidad] =
    useState<Disponibilidad | null>(null);

  useEffect(() => {
    dispatch(fetchDisponibilidadesByService(servicioId));
  }, [dispatch, servicioId, currentDate]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (isAdmin && currentView === "day") {
      const start = moment(slotInfo.start).toISOString();
      const end = moment(slotInfo.end).toISOString();

      const disponibilidadToSave = {
        servicio_id: servicioId,
        fecha_inicio: start,
        fecha_fin: end,
        disponible: true,
        servicio_nombre: "Nombre del servicio",
        servicio_precio: 100, // Rellenar con el precio correcto
      };

      dispatch(addDisponibilidad(disponibilidadToSave)).then(() => {
        dispatch(fetchDisponibilidadesByService(servicioId));
      });
    }
  };

  const handleSelectEvent = (event: Disponibilidad) => {
    if (isAdmin) {
      setSelectedDisponibilidad(event);
    }
  };

  const handleDeleteDisponibilidad = () => {
    if (selectedDisponibilidad && selectedDisponibilidad.id) {
      dispatch(deleteDisponibilidad(selectedDisponibilidad.id)).then(() => {
        setSelectedDisponibilidad(null); // Limpiamos la selección
        dispatch(fetchDisponibilidadesByService(servicioId));
      });
    }
  };

  // Ajuste para la visualización en el calendario
  const events = disponibilidades
    .filter((disp) => disp.disponible)
    .map((disp) => ({
      ...disp,
      // Ajustar las horas +3 horas solo para la visualización en el calendario
      start: moment(disp.fecha_inicio).add(3, "hours").toDate(),
      end: moment(disp.fecha_fin).add(3, "hours").toDate(),
    }));

  const handleNavigate = (date: Date, view: View, action: NavigateAction) => {
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
          selectable={isAdmin}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={handleNavigate}
          messages={messages}
        />
      </CalendarContainer>

      {isAdmin && selectedDisponibilidad && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleDeleteDisponibilidad}>
            Eliminar Disponibilidad
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
