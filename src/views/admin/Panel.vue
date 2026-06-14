<script setup>
import { ref, onMounted } from "vue";
import { getEstablecimientos, deleteEstablecimiento } from "@/services/establecimientoService"

import { confirmDialog ,notificacionError, notificacionToast} from "@/utils/alertUtil"

const establecimientos = ref([])

const params = ref({
    per_page: 10,
    page: 1,
})


const cargarEstablecimientos = async () => {

    const resultado = await getEstablecimientos(params.value)

    establecimientos.value = resultado.data

}



const eliminarEstablecimiento = async id =>{

    const confirmacion = await confirmDialog('Confirmar Eliminación', '¿Estas seguro de eliminar este establecimiento?')

    if (!confirmacion) return;

    try {
        const resultado = await deleteEstablecimiento(id)

        establecimientos.value = establecimientos.value.filter(item => item.id != id)
        notificacionToast(resultado.message)

    } catch (error) {
        notificacionError(error.response)
        
    }

}


onMounted(() => {

    cargarEstablecimientos()

})





</script>


<template>
    <section class="page-banner">
        <div class="page-banner-overlay">
            <div class="container text-center">
                <h1>Panel de Control</h1>
                <p class="breadcrumb-text">
                    <RouterLink :to="{ name: 'Inicio' }">Inicio</RouterLink> /
                    Panel de Control
                </p>
            </div>
        </div>
    </section>

    <section class="content py-5">

        <div class="container">
            <div class="detail-section anim fade-up text-center">
                <h5 class="detail-section-titles">
                    Bienvenido Admin a tu Panel de Control
                </h5>
                <p>
                    Aquí puedes gestionar tus establecimientos

                </p>



            </div>

            <div class="detail-section anim fade-up">
                <div class="detail-section-title d-flex justify-content-between align-items-center" >
                    <h5 class="">
                        <i class="fas fa-info-circle me-2"></i>
                        MIS ESTABLECIMIENTOS
                    </h5>
                    <RouterLink class="btn btn-primary" :to="{name: 'CrearEstablecimiento'}">
                        <i class="fas fa-plus  text-white"></i>
                        Nuevo 
                    </RouterLink>
                </div>


                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Dirección</th>
                            <th>Estado </th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="(item, index) in  establecimientos" :key="item.id">
                            <td>{{  index+1  }}</td>
                            <td> {{ item.nombre }} </td>
                            <td> {{ item.categoria.nombre }} </td>
                            <td> {{ item.direccion }} </td>
                            <td>
                                <span :class="item.estado =='ACTIVO' ? 'text-success' : 'text-danger'">
                                    {{ item.estado }}
                                </span>    
                            </td>
                            <td>
                                <RouterLink :to="{name:'DetalleEstablecimiento', params:{id: item.id}}">
                                    <i class="fas fa-eye text-primary"></i>
                                </RouterLink>
                                <RouterLink class="mx-2" :to="{name:'EditarEstablecimiento', params:{id: item.id}}">
                                    <i class="fas fa-pencil-alt text-warning"></i>
                                </RouterLink>

                                <button @click="eliminarEstablecimiento(item.id)" class="btn btn-link p-0">
                                    <i class="fas fa-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-if="establecimientos.length === 0">
                            <td colspan="100%">
                                <p class="text-center p-5">No hay establecimientos disponibles.</p>
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>
        </div>

    </section>

</template>