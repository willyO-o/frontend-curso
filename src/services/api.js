import axios from "axios";


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


export default api;