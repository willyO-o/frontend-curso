import * as yup from "yup";

const servicioValidationSchema = yup.object({
//   establecimiento_id: yup.number().required("No se ha seleccionado un establecimiento"),
  nombre_servicio: yup.string().required("El nombre del servicio es obligatorio").min(3, "El nombre del servicio debe tener al menos 3 caracteres"),
  descripcion_servicio: yup.string().required("la descripcion del servicio es obligatoria").min(10, "La descripción del servicio debe tener al menos 10 caracteres"),
  precio: yup.number().required("El precio es requerido").min(0, "Ingrese un precio válido").typeError('Ingrese un número válido'),
  tipo: yup.string().required("Seleccione un tipo de servicio").oneOf(['SERVICIO', 'PRODUCTO'], "Seleccione una opcion válida"),
  icono: yup.string().required("Seleccione un icono"),
  disponible: yup.boolean().required("Seleccione la disponibilidad del servicio"),
});


export default servicioValidationSchema;