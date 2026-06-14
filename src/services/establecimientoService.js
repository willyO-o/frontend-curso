import api from '@/services/api';




export const getEstablecimientos = async (params = {}) => {

    const repuesta = await api.get('/establecimientos', { params: params })
    return repuesta.data;
}




export const createEstablecimiento = async datos => {

    api.defaults.headers['Content-Type'] = 'multipart/form-data';
    const respuesta = await api.post('/establecimientos', datos)

    return respuesta.data;
}

export const deleteEstablecimiento = async id => {

    const respuesta = await api.delete('/establecimientos/' + id)

    return respuesta.data;
}

export const getEstablecimientoId = async id => {

    const respuesta = await api.get('/establecimientos/' + id)
    return respuesta.data;

}


//public Establecimientos


export const getEstablecimientoIdPublic = async id => {

    const respuesta = await api.get('/establecimientos-public/' + id)
    return respuesta.data;

}


export const getEstablecimientosPublic = async (params = {}) => {

    const repuesta = await api.get('/establecimientos-public', { params: params })
    return repuesta.data;
}