<script setup>


import { ref, reactive, onMounted } from 'vue';

import { getCategorias } from '@/services/categoriaService'

import Mapa from '@/components/Mapa.vue'

const datosFormulario = reactive({
    nombre: '',
    descripcion: '',
    direccion: '',
    imagen: '',
    telefono: '',
    email: '',
    website: '',
    horario_apertura: '',
    horario_cierre: '',
    latitud: '',
    longitud: '',
    estado: '',
    categoria_id: '',
    user_id: ''
})

const categorias = ref([])

const cargarCategorias = async () => {

    const resultado = await getCategorias()
    categorias.value = resultado.data

    console.log(categorias.value);


}


const recibirCoordenadas = cords=> {


    datosFormulario.latitud = cords.latitud
    datosFormulario.longitud = cords.longitud


    console.log( "formulario:",  datosFormulario.latitud, datosFormulario.longitud);
}


onMounted(() => {

    cargarCategorias()
})





</script>

<template>

    <!-- ==================== PAGE BANNER ==================== -->
    <section class="page-banner">
        <div class="page-banner-overlay">
            <div class="container text-center">
                <h1>Registrar Establecimiento</h1>
                <p class="breadcrumb-text">
                    <RouterLink :to="{ name: 'Inicio' }">Incio</RouterLink> / Registrar Establecimiento
                </p>
            </div>
        </div>
    </section>

    <!-- ==================== REGISTER SECTION ==================== -->
    <section class="py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-md-11">
                    <div class="auth-card anim scale-in">
                        <div class="auth-card-header">
                            <h3><i class="fas fa-building me-2"></i>Registrar Establecimiento</h3>
                            <p>Los campos marcados con * son obligatorios</p>
                        </div>
                        <div class="auth-card-body">
                            <form id="registerForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="nombre" class="form-label">Nombre del Establecimiento <span
                                                class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-building"></i></span>
                                            <input type="text" class="form-control" id="nombre" name="nombre"
                                                placeholder="Nombre del Establecimiento">
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="categoria_id" class="form-label">Categoria <span
                                                class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-star"></i></span>
                                            <select class="form-select" id="categoria_id" name="categoria_id" required>
                                                <option :value="0" disabled selected>Seleccione una categoría</option>
                                                <option v-for="categoria in categorias" :key="categoria.id"
                                                    :value="categoria.id"> {{ categoria.nombre }} </option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="direccion" class="form-label">Direccion <span
                                            class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                        <input type="email" class="form-control" id="direccion" name="direccion"
                                             >
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <Mapa @actualizar:coordenadas="recibirCoordenadas" />
                                </div>
                                <div class="mb-3">
                                    <label for="regPhone" class="form-label">Phone Number</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                        <input type="tel" class="form-control" id="regPhone"
                                            placeholder="Enter your phone number">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="regPassword" class="form-label">Password *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" class="form-control" id="regPassword"
                                                placeholder="Create password" required>
                                            <button class="btn btn-toggle-password" type="button"
                                                data-target="regPassword"><i class="fas fa-eye"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="regConfirmPassword" class="form-label">Confirm Password *</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" class="form-control" id="regConfirmPassword"
                                                placeholder="Confirm password" required>
                                            <button class="btn btn-toggle-password" type="button"
                                                data-target="regConfirmPassword"><i class="fas fa-eye"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-check mb-4">
                                    <input class="form-check-input" type="checkbox" id="agreeTerms" required>
                                    <label class="form-check-label" for="agreeTerms">
                                        I agree to the <a href="#" class="forgot-link">Terms & Conditions</a> and <a
                                            href="#" class="forgot-link">Privacy Policy</a>
                                    </label>
                                </div>
                                <button type="submit" class="btn btn-auth-submit w-100">CREATE ACCOUNT</button>
                            </form>

                            <div class="auth-divider">
                                <span>or register with</span>
                            </div>

                            <div class="social-login">
                                <a href="#" class="btn-social btn-facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="btn-social btn-google"><i class="fab fa-google"></i></a>
                                <a href="#" class="btn-social btn-twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="btn-social btn-linkedin"><i class="fab fa-linkedin-in"></i></a>
                            </div>

                            <p class="auth-footer-text">Already have an account? <a href="login.html">Login here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>