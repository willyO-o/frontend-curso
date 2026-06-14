<script setup>
import { ref, reactive } from "vue";
import { login } from "@/services/authService"

import { notificacionToast, notificacionError } from '@/utils/alertUtil'

import { loginValidationSchema } from "@/schemas/authValidationSchema"

import { Form, Field, ErrorMessage } from "vee-validate";

import userStore from "@/stores/userStore";
import { useRouter } from "vue-router";


const usuarioStore = userStore();
const router = useRouter();


const mostrarPassword = ref(false);

const procesando = ref(false);

const credenciales = reactive({
    email: '',
    password: '',
    remember: false
})


const iniciarSesion = async () => {

    procesando.value = true;
    try {
        const resultado = await login(credenciales)

        usuarioStore.setToken(resultado.data.token)
        usuarioStore.setUsuario(resultado.data.user)

        notificacionToast(resultado.message)

        setTimeout(() => {
            router.push({ name: 'Panel' })
            procesando.value = false;

        }, 2000);

    } catch (error) {
        procesando.value = false;
        notificacionError(error.response)
    }
}



</script>

<template>

    <!-- ==================== PAGE BANNER ==================== -->
    <section class="page-banner">
        <div class="page-banner-overlay">
            <div class="container text-center">
                <h1>Iniciar Sesión</h1>
                <p class="breadcrumb-text"><a href="index.html">Inicio</a> / Iniciar Sesión</p>
            </div>
        </div>
    </section>

    <!-- ==================== LOGIN SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5 col-md-7">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-sign-in-alt me-2"></i>Iniciar Sesión</h3>
                            <p>¡Bienvenido de nuevo! Por favor, inicia sesión en tu cuenta.</p>
                        </div>
                        <div class="auth-card-body">
                            <Form id="loginForm" :validation-schema="loginValidationSchema" @submit="iniciarSesion"
                                v-slot="{ errors }">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Correo Electrónico *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        <Field type="email" class="form-control" id="email" name="email"
                                            placeholder="ingresa tu correo" v-model="credenciales.email"
                                            :class="{ 'is-invalid': errors.email }" />
                                    </div>
                                    <ErrorMessage name="email" class="text-danger small" />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Contraseña *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                        <Field :type="mostrarPassword ? 'text' : 'password'" class="form-control"
                                            id="password" placeholder="Ingresa tu contraseña" name="password"
                                            v-model="credenciales.password"
                                            :class="{ 'is-invalid': errors.password }" />
                                        <button @click="mostrarPassword = !mostrarPassword" class=" btn-toggle-password"
                                            type="button" data-target="password"><i class="fas fa-eye"></i></button>
                                    </div>
                                    <ErrorMessage name="password" class="text-danger small" />

                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="rememberMe"
                                            v-model="credenciales.remember" :value="true">
                                        <label class="form-check-label" for="rememberMe">Recuérdame</label>
                                    </div>
                                    <a href="#" class="forgot-link">Olvidaste tu contraseña?</a>
                                </div>
                                <button type="submit" class=" btn-auth-submit w-100" :disabled="procesando">
                                    <i
                                        :class="{ 'fas fa-spinner fa-spin': procesando, 'fas fa-sign-in-alt': !procesando }"></i>

                                    Inciar Sesión
                                </button>
                            </Form>

                            <!-- <div class="auth-divider d-none">
                                <span>o inicia sesión con</span>
                            </div>

                            <div class="social-login d-none">
                                <a href="#" class="btn-social btn-facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="btn-social btn-google"><i class="fab fa-google"></i></a>
                                <a href="#" class="btn-social btn-twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="btn-social btn-linkedin"><i class="fab fa-linkedin-in"></i></a>
                            </div> -->

                            <p class="auth-footer-text mt-2">¿No tienes una cuenta? <RouterLink :to="{ name: 'Registro' }">
                                    Regístrate aquí</RouterLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>