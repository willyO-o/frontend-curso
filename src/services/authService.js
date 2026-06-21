import api from "./api";



export const registro = async datosUsuario => {

    const respuesta = await api.post("/auth/registrarse", datosUsuario)

    return respuesta.data;

}


export const login = async credenciales => {
    const respuesta = await api.post("/auth/login", credenciales)
    return respuesta.data;
}

export const logout = async () => {
    const respuesta = await api.post("/auth/logout")
    return respuesta.data;
}
