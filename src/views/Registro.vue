<script setup>
import { reactive, ref } from "vue";

import { registro } from "@/services/authService";

import { notificacionToast, notificacionError } from '@/utils/alertUtil'

import { registroValidationSchema } from "@/schemas/authValidationSchema"

import { Form, Field, ErrorMessage } from "vee-validate";

import userStore from "@/stores/userStore"

import { useRouter } from "vue-router";


const usuarioStore = userStore();
const router = useRouter();

const procesando = ref(false);

const datosUsuario = reactive({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
})


const mostrarPassword = ref(false);


const procesarRegistro = async () => {

    procesando.value = true;
    try {
        const resultado = await registro(datosUsuario)

        usuarioStore.setToken(resultado.data.token)
        usuarioStore.setUsuario(resultado.data.user)

        notificacionToast(resultado.message)

        setTimeout(() => {
            router.push({ name: 'Panel' })
            procesando.value = false;
        }, 1500);

    } catch (error) {
        notificacionError(error.response)
        procesando.value = false;
    }

}











</script>


<template>
    <!-- ==================== REGISTER SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-7 col-md-9">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-user-plus me-2"></i>Crear Cuenta</h3>
                            <p>Únete hoy! Completa el formulario a continuación para comenzar.</p>
                        </div>
                        <div class="auth-card-body">
                            <Form :validation-schema="registroValidationSchema" @submit="procesarRegistro"
                                id="registerForm" v-slot="{ errors }">
                                <div class="row">
                                    <div class="col-md-12 mb-3">
                                        <label for="name" class="form-label">Nombre completo *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                            <Field type="text" v-model="datosUsuario.name" class="form-control"
                                                id="name" name="name" placeholder="Ingresa tu nombre completo" required
                                                :class="{ 'is-invalid': errors.name }" />
                                        </div>
                                        <ErrorMessage name="name" class="text-danger small" />
                                    </div>

                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email Address *</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        <Field type="email" v-model="datosUsuario.email" class="form-control" id="email"
                                            name="email" placeholder="por ejemplo: usuario@ejemplo.com"
                                            :class="{ 'is-invalid': errors.email }" />
                                    </div>
                                    <ErrorMessage name="email" class="text-danger small" />

                                </div>

                                <div class="row">
                                    <div class="col-md-12 mb-3">
                                        <label for="password" class="form-label">Contraseña *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <Field :type="mostrarPassword ? 'text' : 'password'"
                                                v-model="datosUsuario.password" class="form-control" id="password"
                                                placeholder="Crear contraseña" name="password"
                                                :class="{ 'is-invalid': errors.password }" />
                                            <button @click="mostrarPassword = !mostrarPassword"
                                                class="btn btn-toggle-password" type="button"><i
                                                    :class="{ 'fas fa-eye': !mostrarPassword, 'fas fa-eye-slash': mostrarPassword }"></i></button>
                                        </div>
                                        <ErrorMessage name="password" class="text-danger small" />

                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <label for="password_confirm" class="form-label">Confirmar Contraseña *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <Field :type="mostrarPassword ? 'text' : 'password'"
                                                v-model="datosUsuario.password_confirm" class="form-control"
                                                id="password_confirm" name="password_confirm"
                                                placeholder="Confirmar contraseña"
                                                :class="{ 'is-invalid': errors.password_confirm }" />
                                            <button @click="mostrarPassword = !mostrarPassword"
                                                class="btn btn-toggle-password" type="button" "><i
                                                    :class="{
                                                        'fas fa-eye': !mostrarPassword, 'fas fa-eye-slash':
                                                            mostrarPassword
                                                    }"></i></button>
                                        </div>
                                        <ErrorMessage name="password_confirm" class="text-danger small" />

                                    </div>
                                </div>

                                <button :disabled="procesando" type="submit" class=" btn-auth-submit w-100">
                                    <i :class="{ 'fas fa-spinner fa-spin': procesando, 'fas fa-save': !procesando }"></i>
                                    CREAR CUENTA
                                </button>
                            </Form>

                            <p class="auth-footer-text">Ya tienes una cuenta? <RouterLink to="/login">Inicia sesión aquí
                                </RouterLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>