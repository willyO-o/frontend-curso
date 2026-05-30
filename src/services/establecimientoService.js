import api from '@/services/api';




export const getEstablecimientos = async (params={}) => {

    const repuesta= await api.get('/establecimientos', {params: params})
    return repuesta.data;
}



export const getEstablecimientoId = async  id  => {
    
    const respuesta = await api.get('/establecimientos/'+ id)
    return respuesta.data;
    
}



export const createEstablecimiento = async datos => {

    const respuesta = await api.post('/establecimientos',datos)

    return respuesta.data;
}