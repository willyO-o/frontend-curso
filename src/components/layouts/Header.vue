<script setup>

import { ref } from 'vue';

import userStore from '@/stores/userStore';
import { confirmDialog } from '@/utils/alertUtil'

const usuarioStore = userStore();


const logout = async () => {

    const confirmar = await confirmDialog('Confirmacion!', '¿Estas seguro de cerrar sesión?', 'Si, cerrar')

    if (!confirmar) return;

    usuarioStore.cerrarSesion()


}



</script>


<template>

    <!-- ==================== TOP BAR ==================== -->
    <div class="top-bar">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <span>
                    BIENVENIDO A NUESTRO SITIO WEB
                </span>
                <div v-if="usuarioStore.estaAutenticado" class="d-flex align-items-center">
                    <i class="fas fa-user"></i>
                    <span class="ms-1"> {{ usuarioStore.usuario?.email }} </span>
                </div>
                <div v-else class="d-flex align-items-center">
                    <RouterLink :to="{ name: 'Login' }">LOGIN</RouterLink>
                    <span class="separator">|</span>
                    <RouterLink :to="{ name: 'Registro' }">REGISTRO</RouterLink>
                </div>

            </div>
        </div>
    </div>

    <!-- ==================== NAVBAR ==================== -->
    <nav class="navbar navbar-expand-lg main-navbar">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{ name: 'Inicio' }">
                <i class="fas fa-globe"></i> Establecimientos
            </RouterLink>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                <ul class="navbar-nav align-items-lg-center">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'Inicio' }">INICIO</RouterLink>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="#">BLOG</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">CONTACTO</a>
                    </li>

                    <li v-if="usuarioStore.estaAutenticado" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fas fa-user-circle"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'Panel' }">Panel</RouterLink>
                            </li>
                            <li><a class="dropdown-item" href="/perfil">Perfil</a></li>
                            <li>
                                <RouterLink class="dropdown-item" :to="{ name: 'CrearEstablecimiento' }">Crear
                                    Establecimiento</RouterLink>
                            </li>
                            <li><a class="dropdown-item" href="javascript:void(0)" @click="logout">Cerrar Sesión</a>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


</template>