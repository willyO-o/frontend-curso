<script setup>


import { ref, reactive, onMounted } from 'vue';

import { getCategorias } from '@/services/categoriaService'

import Mapa from '@/components/Mapa.vue'

import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import image preview and file type validation plugins

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import establecimientoValidationSchema from '@/schemas/establecimientoValidationSchema'

import { Form, Field, ErrorMessage } from 'vee-validate'


import { createEstablecimiento, getEstablecimientoId, updateEstablecimiento } from '@/services/establecimientoService'

import {notificacionToast, notificacionError} from '@/utils/alertUtil'

import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';



const route = useRoute();
const router = useRouter();

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
);

const datosFormulario = reactive({
    nombre: '',
    descripcion: '',
    direccion: '',
    archivo_imagen: null,
    telefono: '',
    email: '',
    website: '',
    horario_apertura: '',
    horario_cierre: '',
    latitud: '',
    longitud: '',
    estado: '',
    categoria_id: 0,
})

const categorias = ref([])

const cargarCategorias = async () => {

    const resultado = await getCategorias()
    categorias.value = resultado.data

    console.log(categorias.value);


}


const recibirCoordenadas = cords => {


    datosFormulario.latitud = cords.latitud
    datosFormulario.longitud = cords.longitud


    console.log("formulario:", datosFormulario.latitud, datosFormulario.longitud);
}


const agregarArchivo = (error, file) => {
    if (error) {

        console.log("error:", error);

        return
    }

    datosFormulario.archivo_imagen = file.file
    console.log(datosFormulario.imagen);

}

const eliminarArchivo = (error, file) => {
    if (error) {

        console.log("error:", error);

        return
    }

    datosFormulario.archivo_imagen = null

}




const guardarEstablecimiento = async () =>{

    try {

        const formData = new FormData();

        for (const key in datosFormulario){
            formData.append(key, datosFormulario[key])
        } 

        let resultado = null 
        if( route.params.id){
            formData.append('_method', 'PUT')
            resultado = await updateEstablecimiento(route.params.id, formData)
        }else{
            resultado = await createEstablecimiento(formData)
        }
        

        console.log(resultado);

        const { id } = resultado.data

        setTimeout(() => {
            router.push({name: 'DetalleEstablecimiento', params:{ id }})
        }, 1500);

        notificacionToast(resultado.message)


    }catch (error) {
        console.log("Error al guardar el establecimiento:", error.response);
        notificacionError(error.response)
    }finally {
        // console.log("Formulario enviado:", datosFormulario);
    }



}

// edicion de establecimiento

const imagenActual = ref('')
const nuevasCoordenadas = ref({
    lat: 0,
    lng: 0
})

const cargarEstablecimiento =  async () =>{

    const idEstablecimientos= route.params.id;
    const resultado = await getEstablecimientoId(idEstablecimientos)

    Object.assign(datosFormulario, resultado.data)
    imagenActual.value = resultado.data.url_imagen
    nuevasCoordenadas.value.lat = resultado.data.latitud
    nuevasCoordenadas.value.lng = resultado.data.longitud
    datosFormulario.categoria_id = resultado.data.categoria_id
}

onMounted(() => {

    cargarCategorias()


    if(route.params.id){
        cargarEstablecimiento()
    }
    

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
                            <Form id="registerForm" :validation-schema="establecimientoValidationSchema"
                                v-slot="{ errors }"  @submit="guardarEstablecimiento">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="nombre" class="form-label">Nombre del Establecimiento <span
                                                class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-building"></i></span>
                                            <Field type="text" class="form-control"
                                                :class="{ 'is-invalid': errors.nombre }" id="nombre" name="nombre"
                                                placeholder="Nombre del Establecimiento"
                                                v-model="datosFormulario.nombre" />
                                        </div>
                                        <ErrorMessage name="nombre" class="small text-danger" />
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="categoria_id" class="form-label">Categoria <span
                                                class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-star"></i></span>
                                            <Field as="select" class="form-select" id="categoria_id" name="categoria_id"
                                                v-model="datosFormulario.categoria_id" required>
                                                <option :value="0" disabled selected>Seleccione una categoría</option>
                                                <option v-for="categoria in categorias" :key="categoria.id"
                                                    :value="categoria.id"> {{ categoria.nombre }} </option>
                                            </Field>
                                        </div>
                                        <ErrorMessage name="categoria_id" class="small text-danger" />

                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="direccion" class="form-label">Direccion <span
                                            class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
                                        <Field type="text" class="form-control" id="direccion" name="direccion"
                                            :class="{ 'is-invalid': errors.nombre }"
                                            v-model="datosFormulario.direccion" />
                                    </div>
                                    <ErrorMessage name="direccion" class="small text-danger" />

                                </div>

                                <div class="mb-3">
                                    <Mapa @actualizar:coordenadas="recibirCoordenadas" 
                                    :latitudNueva="nuevasCoordenadas.lat"
                                    :longitudNueva="nuevasCoordenadas.lng"
                                    :geolocation="false"
                                    />

                                    <Field type="hidden" name="latitud" v-model="datosFormulario.latitud" />
                                    <Field type="hidden" name="longitud" v-model="datosFormulario.longitud" />

                                    <ErrorMessage name="longitud" class="small text-danger" />
                                </div>

                                <div class="row">
                                    <div class="col-md-6  mb-3">
                                        <label for="telefono" class="form-label">Numero de telefono <span
                                                class="text-danger">*</span> </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                            <Field type="tel" class="form-control" id="telefono" name="telefono"
                                                v-model="datosFormulario.telefono"
                                                :class="{ 'is-invalid': errors.telefono }" />
                                        </div>
                                        <ErrorMessage name="telefono" class="small text-danger" />
                                    </div>
                                    <div class="col-md-6  mb-3">
                                        <label for="email" class="form-label">Correo</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <Field type="email" class="form-control" id="email" name="email"
                                                v-model="datosFormulario.email"
                                                :class="{ 'is-invalid': errors.email }" />
                                        </div>
                                        <ErrorMessage name="email" class="small text-danger" />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="website" class="form-label">Sitio web </label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-globe"></i></span>
                                        <Field type="url" class="form-control" id="website" name="website"
                                            v-model="datosFormulario.website"
                                            :class="{ 'is-invalid': errors.website }" />
                                    </div>
                                    <ErrorMessage name="website" class="small text-danger" />
                                </div>

                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="horario_apertura" class="form-label">Hora Apertura <span
                                                class="text-danger">*</span></label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                            <Field type="time" class="form-control" id="horario_apertura"
                                                name="horario_apertura" required
                                                v-model="datosFormulario.horario_apertura"
                                                :class="{ 'is-invalid': errors.horario_apertura }" />
                                        </div>
                                        <ErrorMessage name="horario_apertura" class="small text-danger" />
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="horario_cierre" class="form-label">Hora Cierre <span
                                                class="text-danger">*</span> </label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                            <Field type="time" class="form-control" id="horario_cierre"
                                                name="horario_cierre" required v-model="datosFormulario.horario_cierre"
                                                :class="{ 'is-invalid': errors.horario_cierre }" />

                                        </div>
                                        <ErrorMessage name="horario_cierre" class="small text-danger" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6" v-if="imagenActual">
                                        <p>Imagen Actual:</p>
                                        <img :src="imagenActual" alt="" class="img-fluid">
                                    </div>
                                    <div class=" mb-3" :class="{ 'col-md-6 pt-5': imagenActual, 'col-md-12': !imagenActual }">

                                        <file-pond name="imagen"
                                            label-idle="Arrastra y suelta tu imagen o haz <u>click</u> para seleccionar"
                                            :allow-multiple="false" max-file-size="2MB" @addfile="agregarArchivo"
                                            @removefile="eliminarArchivo"
                                            accepted-file-types="image/png, image/jpeg, image/jpg, image/avif, image/webp" />
                                        <p v-if="imagenActual" class="text-muted small">
                                            Si subes una nueva imagen, la actual será reemplazada.
                                        </p>
                                    </div>

                                </div>

                                <div class="mb-3">
                                    <label for="descripcion" class="form-label">Descripcion <span
                                            class="text-danger">*</span></label>
                                    <div class="border rounded">

                                        <Field as="textarea" name="descripcion" id="descripcion" class="form-control"
                                            rows="5" v-model="datosFormulario.descripcion"
                                            :class="{ 'is-invalid': errors.descripcion }"></Field>
                                    </div>
                                    <ErrorMessage name="descripcion" class="small text-danger" />
                                </div>

                                <div class="mb-4">
                                    <div class="form-check ">
                                        <Field class="form-check-input" name="terminos_condiciones" type="checkbox"
                                            id="terminos_condiciones" :class="{ 'is-invalid': errors.terminos_condiciones }"
                                             required :value="true" />
                                        <label class="form-check-label" for="terminos_condiciones">
                                            Acepto los <a href="#" class="forgot-link">Terminos & Condiciones</a> y la
                                            <a href="#" class="forgot-link">Politica de Privacidad</a>
                                        </label>
                                    </div>
                                    <ErrorMessage name="terminos_condiciones" class="small text-danger" />
                                </div>


                                <button type="submit" class=" btn-auth-submit w-100">
                                    <i class="fas fa-save"></i>
                                    Guardar

                                </button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>