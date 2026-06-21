import { defineStore } from 'pinia'

import { useRouter } from 'vue-router'

import { useStorage } from '@vueuse/core'

import { computed } from 'vue'

import { logout } from '@/services/authService'

import { notificacionToast } from '@/utils/alertUtil'

const userStore = defineStore('user', () => {

    const router = useRouter()

    const usuario = useStorage('usuario', null)

    const accessToken = useStorage('accessToken', null)


    const setToken = newToken => {
        accessToken.value = newToken
    }

    const setUsuario = newUsuario => {
        usuario.value = newUsuario
    }

    const estaAutenticado = computed(()=>{
        return usuario.value != null && accessToken.value != null
    })


    const cerrarSesion = async () => {

        try {
            const resultado = await logout()

            notificacionToast(resultado.message)

        } catch (error) {
            console.error('Error al cerrar sesión:', error)
            notificacionToast('Se cerro la sesión')

        } finally {
            usuario.value = null
            accessToken.value = null
            router.push({ name: 'Login' })
        }

    }


    return {
        usuario,
        accessToken,
        setToken,
        setUsuario,
        cerrarSesion,
        estaAutenticado
    }

})


export default userStore;

