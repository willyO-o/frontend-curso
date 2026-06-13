import {defineStore} from 'pinia'

import { ref } from 'vue'

import { useStorage } from '@vueuse/core'

const userStore = defineStore('user', ()=> {

    const usuario = useStorage('usuario', null)

    const accessToken = useStorage('accessToken', null)


    const setToken= newToken => {
        accessToken.value = newToken
    }

    const setUsuario = newUsuario => {
        usuario.value = newUsuario
    }

    return {
        usuario,
        accessToken,
        setToken,
        setUsuario,
    }

})


export default userStore;

