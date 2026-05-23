import api from "@/services/api";


export const getCategorias = async () => {

    const respuesta = await api.get('/categorias')
    
    return respuesta.data;

}