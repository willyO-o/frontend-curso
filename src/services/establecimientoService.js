import api from '@/services/api';




export const getEstablecimientos = async (params={}) => {

    const repuesta= await api.get('/establecimientos', {params: params})
    return repuesta.data;
}


export const createEstablecimiento = async datos => {

    const respuesta = await api.post('/establecimientos',datos)

    return respuesta.data;
}