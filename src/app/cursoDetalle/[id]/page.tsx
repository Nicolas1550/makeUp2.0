"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchCourseById,
  selectCourseById,
  addCourseFecha,
  updateCourseFecha,
  deleteCourseFecha,
  updateCoursePrice, // Importamos el thunk para actualizar el precio
} from "@/redux/features/course/courseSlice";
import { format, parseISO } from "date-fns";
import {
  AdditionalMaterial,
  ClassItem,
  CourseDetailContainer,
  CourseTitle,
  CourseDescription,
  DetailSection,
  VideoLink,
  BuyButton,
  InfoWrapper,
  CourseInfo,
  ClassesWrapper,
  ClassesSubContainer,
  Divider,
  FechaItem,
  EditButton,
  DeleteButton,
  ViewMoreButton,
  TimeInput,
  DateInput,
  FechaTexto,
  SpinnerContainer,
  Spinner,
} from "@/app/components/courses/courseDetailPage";

import { selectIsAdmin } from "@/redux/authSelectors";

const CourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => selectCourseById(state, Number(id)));
  const isAdmin = useAppSelector(selectIsAdmin);

  const [editingFechaId, setEditingFechaId] = useState<number | null>(null);
  const [updatedFecha, setUpdatedFecha] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    hora_inicio: "",
    hora_fin: "",
  });
  const [newFecha, setNewFecha] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    hora_inicio: "",
    hora_fin: "",
  });

  const [visibleClasses, setVisibleClasses] = useState(5);
  const [newPrecio, setNewPrecio] = useState<number | null>(null); // Estado para el nuevo precio
  const [isEditingPrice, setIsEditingPrice] = useState(false); // Estado para editar el precio

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(Number(id)));
    }
  }, [dispatch, id]);

  // Manejar edición del precio
  const handleEditPrice = () => {
    setIsEditingPrice(true);
    setNewPrecio(course?.precio || 0); // Cargar el precio actual en el campo de edición
  };

  const handleSavePrice = () => {
    if (newPrecio !== null) {
      dispatch(updateCoursePrice({ id: Number(id), precio: newPrecio }));
      setIsEditingPrice(false); // Salimos del modo edición después de guardar
    }
  };

  const handleEditFecha = (fechaId: number) => {
    setEditingFechaId(fechaId);
    const fecha = course?.fechas?.find((f) => f.id === fechaId);
    if (fecha) {
      setUpdatedFecha({
        fecha_inicio: fecha.fecha_inicio,
        fecha_fin: fecha.fecha_fin,
        hora_inicio: fecha.hora_inicio || "",
        hora_fin: fecha.hora_fin || "",
      });
    }
  };

  const handleSaveFecha = () => {
    const cursoId = Number(id);

    if (
      cursoId &&
      editingFechaId &&
      updatedFecha.fecha_inicio &&
      updatedFecha.fecha_fin &&
      updatedFecha.hora_inicio &&
      updatedFecha.hora_fin
    ) {
      dispatch(
        updateCourseFecha({
          cursoId,
          fechaId: editingFechaId,
          updatedFecha,
        })
      );
      setEditingFechaId(null);
    }
  };

  const handleDeleteFecha = (fechaId: number) => {
    const cursoId = Number(id);

    if (cursoId && fechaId) {
      dispatch(deleteCourseFecha({ cursoId, fechaId }));
    }
  };

  const handleAddFecha = () => {
    if (
      newFecha.fecha_inicio &&
      newFecha.fecha_fin &&
      newFecha.hora_inicio &&
      newFecha.hora_fin
    ) {
      dispatch(
        addCourseFecha({
          id: Number(id),
          newFecha: {
            curso_id: Number(id),
            fecha_inicio: newFecha.fecha_inicio,
            fecha_fin: newFecha.fecha_fin,
            hora_inicio: newFecha.hora_inicio,
            hora_fin: newFecha.hora_fin,
          },
        })
      );
      setNewFecha({
        fecha_inicio: "",
        fecha_fin: "",
        hora_inicio: "",
        hora_fin: "",
      });
    }
  };

  const handleViewMoreClasses = () => {
    setVisibleClasses((prev) => prev + 5);
  };

  if (!course) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  const formatDate = (dateString: string, formatString: string) => {
    return format(parseISO(dateString), formatString);
  };

  return (
    <CourseDetailContainer>
      <CourseTitle>{course.nombre}</CourseTitle>
      <CourseDescription>{course.descripcion}</CourseDescription>

      <Divider />

      <InfoWrapper>
        <CourseInfo>
          <DetailSection>
            <strong>Duración:</strong> {course.duracion}
          </DetailSection>
          <DetailSection>
            <strong>Nivel:</strong> {course.nivel}
          </DetailSection>
          <DetailSection>
            <strong>Precio:</strong>{" "}
            {isAdmin ? (
              isEditingPrice ? (
                <>
                  <input
                    type="number"
                    value={newPrecio ?? ""}
                    onChange={(e) => setNewPrecio(Number(e.target.value))}
                  />
                  <EditButton onClick={handleSavePrice}>
                    Guardar Precio
                  </EditButton>
                </>
              ) : (
                <>
                  ${course.precio}
                  <EditButton onClick={handleEditPrice}>
                    Editar Precio
                  </EditButton>
                </>
              )
            ) : (
              <>${course.precio}</>
            )}
          </DetailSection>

          <div>
            <h3>Fechas del curso:</h3>
            {course.fechas && course.fechas.length > 0 ? (
              <ul>
                {course.fechas.map((fecha) => (
                  <FechaItem key={fecha.id}>
                    {editingFechaId === fecha.id ? (
                      <>
                        <DateInput
                          type="date"
                          value={updatedFecha.fecha_inicio}
                          onChange={(e) =>
                            setUpdatedFecha({
                              ...updatedFecha,
                              fecha_inicio: e.target.value,
                            })
                          }
                        />
                        <DateInput
                          type="date"
                          value={updatedFecha.fecha_fin}
                          onChange={(e) =>
                            setUpdatedFecha({
                              ...updatedFecha,
                              fecha_fin: e.target.value,
                            })
                          }
                        />
                        <TimeInput
                          type="time"
                          value={updatedFecha.hora_inicio}
                          onChange={(e) =>
                            setUpdatedFecha({
                              ...updatedFecha,
                              hora_inicio: e.target.value,
                            })
                          }
                        />
                        <TimeInput
                          type="time"
                          value={updatedFecha.hora_fin}
                          onChange={(e) =>
                            setUpdatedFecha({
                              ...updatedFecha,
                              hora_fin: e.target.value,
                            })
                          }
                        />
                        <EditButton onClick={handleSaveFecha}>
                          Guardar
                        </EditButton>
                      </>
                    ) : (
                      <FechaTexto>
                        Inicia el{" "}
                        <strong>
                          {formatDate(fecha.fecha_inicio, "dd/MM/yyyy")}
                        </strong>
                        y termina el{" "}
                        <strong>
                          {formatDate(fecha.fecha_fin, "dd/MM/yyyy")}
                        </strong>
                        , desde las <strong>{fecha.hora_inicio}</strong> hasta
                        las <strong>{fecha.hora_fin}</strong>.
                      </FechaTexto>
                    )}

                    {isAdmin && (
                      <>
                        <EditButton onClick={() => handleEditFecha(fecha.id)}>
                          Editar
                        </EditButton>
                        <DeleteButton
                          onClick={() => handleDeleteFecha(fecha.id)}
                        >
                          Eliminar
                        </DeleteButton>
                      </>
                    )}
                  </FechaItem>
                ))}
              </ul>
            ) : (
              <p>No hay fechas disponibles para este curso.</p>
            )}

            {isAdmin && (
              <div>
                <h4>Agregar nueva fecha:</h4>
                <DateInput
                  type="date"
                  value={newFecha.fecha_inicio}
                  onChange={(e) =>
                    setNewFecha({ ...newFecha, fecha_inicio: e.target.value })
                  }
                  placeholder="Fecha de inicio"
                />
                <DateInput
                  type="date"
                  value={newFecha.fecha_fin}
                  onChange={(e) =>
                    setNewFecha({ ...newFecha, fecha_fin: e.target.value })
                  }
                  placeholder="Fecha de fin"
                />
                <TimeInput
                  type="time"
                  value={newFecha.hora_inicio}
                  onChange={(e) =>
                    setNewFecha({ ...newFecha, hora_inicio: e.target.value })
                  }
                  placeholder="Hora de inicio"
                />
                <TimeInput
                  type="time"
                  value={newFecha.hora_fin}
                  onChange={(e) =>
                    setNewFecha({ ...newFecha, hora_fin: e.target.value })
                  }
                  placeholder="Hora de fin"
                />
                <EditButton onClick={handleAddFecha}>Agregar Fecha</EditButton>
              </div>
            )}
          </div>

          <BuyButton
            href="https://wa.me/542964541181"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contáctanos en WhatsApp
          </BuyButton>
        </CourseInfo>

        <ClassesWrapper>
          <h2>Clases Incluidas</h2>
          <ClassesSubContainer>
            <ul>
              {course.clases && course.clases.length > 0 ? (
                course.clases.slice(0, visibleClasses).map((clase) => (
                  <ClassItem key={clase.id}>
                    <h3>{clase.titulo}</h3>
                    <p>{clase.descripcion}</p>
                    {clase.video_url && (
                      <VideoLink href={clase.video_url} target="_blank">
                        Ver Video
                      </VideoLink>
                    )}
                    {clase.material_adicional && (
                      <AdditionalMaterial>
                        Material adicional: {clase.material_adicional}
                      </AdditionalMaterial>
                    )}
                  </ClassItem>
                ))
              ) : (
                <p>No hay clases disponibles para este curso.</p>
              )}
            </ul>
            {course.clases && visibleClasses < course.clases.length && (
              <ViewMoreButton onClick={handleViewMoreClasses}>
                Ver más
              </ViewMoreButton>
            )}
          </ClassesSubContainer>
        </ClassesWrapper>
      </InfoWrapper>
    </CourseDetailContainer>
  );
};

export default CourseDetailPage;
