import axios from "axios";

import { createAuthRefresh } from 'axios-auth-refresh';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(configuracion => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        configuracion.headers['Authorization'] = 'Bearer ' + token;
    }
    return configuracion;

})

const logicaRefresh = solicitudFallida => api.post('auth/refresh').then(respuestaRefreshtoken => {

    const  nuevoToken = respuestaRefreshtoken.data.data.token
    localStorage.setItem('accessToken', nuevoToken)
    solicitudFallida.response.config.headers['Authorization']= 'Bearer ' + nuevoToken;

    return Promise.resolve();
}).catch( error => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('usuario');
    window.location.href = '/login';
    return  Promise.reject(error);
})


createAuthRefresh(api, logicaRefresh )


export default api;