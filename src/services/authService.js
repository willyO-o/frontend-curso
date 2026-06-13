import api from "./api";



export const registro = async datosUsuario => {

    const respuesta =  await api.post("/auth/registrarse", datosUsuario)

    return respuesta.data;

}