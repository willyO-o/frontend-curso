<script setup>
import  userStore  from '@/stores/userStore';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const usuarioStore = userStore();

const router = useRouter();


watch(() =>[ usuarioStore.usuario, usuarioStore.accessToken], ([nuevoUsuario,nuevoAccessToken]) => {
    if(!nuevoUsuario || !nuevoAccessToken){
        router.push({ name: 'Login' })
    }
})




</script>

<template>


    <RouterView />
    

</template>