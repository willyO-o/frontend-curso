import * as yup from 'yup';



const establecimientoValidationSchema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio').min(4, 'Por favor ingrese almenos 4 caracteres'),
    descripcion: yup.string().required('La descripción es obligatoria').min(10, 'Por favor ingrese almenos 10 caracteres'),
    direccion: yup.string().required('la direccion es obligatoria'),
    // imagen: null,
    telefono: yup.number().typeError('Por favor ingrese un numero valido').required("El telefono es obligatorio").max(79999999,'Ingrese un numero valido para Bolivia'),
    email: yup.string().email('por favor ingrese un correo valido'),
    website: yup.string().url('Por favor ingrese una URL valida'),
    horario_apertura: yup.string().required('El horario de apertura es obligatorio'),
    horario_cierre: yup.string().required('El horario de cierre es obligatorio'),
    latitud: yup.string().required('Por favor Seleccione una ubicación en el mapa'),
    longitud: yup.string().required('Por favor Seleccione una ubicación en el mapa'),
    // estado: ,
    categoria_id: yup.number().required('por favor seleccione una categoria').min(1, 'por favor seleccione una categoria'),
    terminos_condiciones: yup.boolean().oneOf([true], 'Debe aceptar los términos y condiciones').required('Debe aceptar los términos y condiciones'),

})


export default establecimientoValidationSchema;

