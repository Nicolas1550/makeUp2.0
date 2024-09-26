import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

// Definición de la interfaz Clase
interface Clase {
  id: number;
  curso_id: number;
  titulo: string;
  descripcion: string;
  orden: number;
  video_url?: string;
  material_adicional?: string;
}

// Definición de la interfaz Fecha con horarios
interface Fecha {
  id: number;
  curso_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string; // Nuevo campo para la hora de inicio
  hora_fin: string; // Nuevo campo para la hora de fin
}

// Definición de la interfaz Course
export interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  precio: number;
  clases?: Clase[]; // Clases asociadas al curso
  fechas?: Fecha[]; // Fechas y horarios asociados al curso
}

// Estado inicial para los cursos
interface CourseState {
  courses: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  status: "idle",
  error: null,
};

// Thunks
// Actualizar el precio de un curso
export const updateCoursePrice = createAsyncThunk(
  "courses/updateCoursePrice",
  async ({ id, precio }: { id: number; precio: number }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://makeupbackend2-0.onrender.com/api/courses/cursos/${id}/precio`,
        { precio },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, precio }; // Retornamos el id y el nuevo precio
    } catch (error) {
      console.error("Error al actualizar el precio:", error);
      throw error;
    }
  }
);

// Obtener todos los cursos
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await axios.get(
      "https://makeupbackend2-0.onrender.com/api/courses/cursos",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);

// Obtener un curso por ID junto con sus clases y fechas
export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (id: number) => {
    const response = await axios.get(
      `https://makeupbackend2-0.onrender.com/api/courses/cursos/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);

// Agregar nueva fecha y horarios a un curso
export const addCourseFecha = createAsyncThunk(
  "courses/addCourseFecha",
  async ({ id, newFecha }: { id: number; newFecha: Omit<Fecha, "id"> }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://makeupbackend2-0.onrender.com/api/courses/cursos/${id}/fechas`,
        newFecha,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al agregar la fecha y horario:", error);
      throw error;
    }
  }
);

// Actualizar una fecha y horario de un curso
export const updateCourseFecha = createAsyncThunk(
  "courses/updateCourseFecha",
  async ({
    cursoId,
    fechaId,
    updatedFecha,
  }: {
    cursoId: number;
    fechaId: number;
    updatedFecha: Partial<Fecha>;
  }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://makeupbackend2-0.onrender.com/api/courses/cursos/${cursoId}/fechas/${fechaId}`,
        updatedFecha,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la fecha y horario:", error);
      throw error;
    }
  }
);

// Eliminar una fecha de un curso
export const deleteCourseFecha = createAsyncThunk(
  "courses/deleteCourseFecha",
  async ({ cursoId, fechaId }: { cursoId: number; fechaId: number }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://makeupbackend2-0.onrender.com/api/courses/cursos/${cursoId}/fechas/${fechaId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return fechaId;
    } catch (error) {
      console.error("Error al eliminar la fecha:", error);
      throw error;
    }
  }
);

// Crear el slice para manejar los cursos
// Crear el slice para manejar los cursos
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener todos los cursos
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al obtener los cursos";
      })
      // Obtener un curso por ID junto con sus clases y fechas
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        const existingCourse = state.courses.find(
          (course) => course.id === action.payload.curso.id
        );
        if (!existingCourse) {
          state.courses.push({
            ...action.payload.curso,
            clases: action.payload.clases,
            fechas: action.payload.fechas,
          });
        } else {
          const index = state.courses.findIndex(
            (course) => course.id === action.payload.curso.id
          );
          state.courses[index] = {
            ...action.payload.curso,
            clases: action.payload.clases,
            fechas: action.payload.fechas,
          };
        }
      })
      // Agregar una fecha y horario a un curso
      .addCase(addCourseFecha.fulfilled, (state, action) => {
        const course = state.courses.find(
          (c) => c.id === action.payload.curso_id
        );
        if (course) {
          if (!course.fechas) {
            course.fechas = [];
          }
          course.fechas.push(action.payload);
        }
      })
      // Actualizar una fecha y horario de un curso
      .addCase(updateCourseFecha.fulfilled, (state, action) => {
        const course = state.courses.find(
          (c) => c.id === action.payload.curso_id
        );
        if (course) {
          const fechaIndex = course.fechas?.findIndex(
            (f) => f.id === action.payload.id
          );
          if (fechaIndex !== undefined && fechaIndex >= 0) {
            course.fechas![fechaIndex] = action.payload;
          }
        }
      })
      // Eliminar una fecha de un curso
      .addCase(deleteCourseFecha.fulfilled, (state, action) => {
        const course = state.courses.find((c) =>
          c.fechas?.some((f) => f.id === action.payload)
        );
        if (course) {
          course.fechas = course.fechas?.filter(
            (fecha) => fecha.id !== action.payload
          );
        }
      })
      // Actualizar el precio de un curso
      .addCase(updateCoursePrice.fulfilled, (state, action) => {
        const course = state.courses.find((c) => c.id === action.payload.id);
        if (course) {
          course.precio = action.payload.precio;
        }
      });
  },
});

export default courseSlice.reducer;

// Selectores para acceder al estado de los cursos
export const selectAllCourses = (state: RootState) => state.courses.courses;
export const selectCourseById = (state: RootState, id: number) => {
  return state.courses.courses.find((course) => course.id === id);
};

export const getCourseStatus = (state: RootState) => state.courses.status;
export const getCourseError = (state: RootState) => state.courses.error;
