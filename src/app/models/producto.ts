export interface Producto {
    _id?: string;
    nombre?: string;
    descripcion?: string;
    isv?: number;
    precio?: number;
    existencia?: number;
    imagen?: string;
    idEmpresa?: String;
    idCategoria?: String;
    nombreCategoria?:String;
    nombreEmpresa?:String;
}