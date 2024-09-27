export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Product extends BaseProduct {
  imageUrl?: string; 
  imageFileName?: string; 
}

export interface CartProduct extends BaseProduct {
  imageUrl: string; 
}
export interface Disponibilidad {
  numOrders?: number; 
  id: number;
  servicio_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  disponible: boolean;
  servicio_nombre: string;
  servicio_precio: number;
  title: string;
  start?: Date | string;
  end?: Date | string;
}

export type NewDisponibilidad = {
  servicio_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  disponible: boolean;
};

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl?: string; 
}
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  telefono?: string;
  fotoUrl?: string;
}
