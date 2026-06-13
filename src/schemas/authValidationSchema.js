import * as yup from "yup";


export const registroValidationSchema = yup.object({
    name: yup.string().required("El nombre es obligatorio").min(5, "El nombre debe tener al menos 5 caracteres"),
    email: yup.string().required("El correo electrónico es requerido").email("El correo electrónico no es válido"),
    password: yup.string().required("La contraseña es requerida").min(8,"La contraseña debe tener al menos 8 caracteres"),
    password_confirm: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required("La confirmación de contraseña es requerida"),

})




