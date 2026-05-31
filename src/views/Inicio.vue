<script setup>


import MapaBanner from '@/components/MapaBanner.vue';

import { ref, onMounted, } from 'vue';

import { getEstablecimientos } from '@/services/establecimientoService'
import { getCategorias } from '@/services/categoriaService'
import Tarjeta from '@/components/Tarjeta.vue';
import TarjetaPlaceholder from '@/components/TarjetaPlaceholder.vue';



const establecimientos = ref([])

const categorias = ref([])

const cargando = ref(false)

const parametrosBusqueda = ref({
    search: '',
    categoria_id: null,
    per_page: 6,
    page: 1
})


const totalResultados = ref(0)



const cargarCategorias = async () => {
    const resultado = await getCategorias()

    categorias.value = resultado.data
}


const cargarEstablecimientos = async () => {


    establecimientos.value = []
    cargando.value = true;
    const resultado = await getEstablecimientos(parametrosBusqueda.value)

    establecimientos.value = resultado.data

    totalResultados.value = resultado.total

    cargando.value = false;

}


const filtrarEstablecimientos = idCategoria => {

    parametrosBusqueda.value.categoria_id = idCategoria;

    cargarEstablecimientos()
}

onMounted(() => {

    cargarCategorias();
    cargarEstablecimientos()

})




</script>

<template>



    <!-- ==================== MAP BANNER ==================== -->

    <MapaBanner />



    <!-- ==================== RESERVATION / SEARCH SECTION ==================== -->
    <section class="reservation-section">
        <div class="container">
            <h2 class="anim fade-down">Make a Free Reservation</h2>
            <div class="search-bar-wrapper anim fade-up anim-d2">
                <span class="menu-icon"><i class="fas fa-bars"></i></span>
                <select class="form-select" style="flex:1; min-width:160px;">
                    <option>Business Services</option>
                    <option>Accommodation</option>
                    <option>Education & Learning</option>
                    <option>Automotive</option>
                    <option>Fitness & Health</option>
                    <option>Technology</option>
                </select>
                <div class="input-with-icon">
                    <input type="text" class="form-control" placeholder="New York, USA">
                    <i class="fas fa-map-marker-alt icon-right"></i>
                </div>
                <select class="form-select" style="flex:1; min-width:140px;">
                    <option>- All Time -</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                    <option>Night</option>
                </select>
                <button class="btn btn-find">FIND MY TABLE</button>
            </div>
        </div>
    </section>

    <!-- ==================== LISTING HEADER ==================== -->
    <div class="listing-header">
        <h3>Establecimientos <span>[{{ totalResultados }}]</span></h3>
    </div>

    <!-- ==================== MAIN CONTENT ==================== -->
    <div class="container pb-5">
        <div class="row">
            <!-- ===== SIDEBAR ===== -->
            <div class="col-lg-3 mb-4 anim fade-left">
                <!-- Results bar (above sidebar on mobile) -->
                <div class="results-bar d-lg-none">
                    <div class="result-count">Tu busqueda obtuvo <strong>{{ totalResultados }}</strong> resultados</div>
                </div>
                <ul class="sidebar-categories">
                    <li>
                        <a @click="filtrarEstablecimientos(null)" href="javascript:void(0)" class="cat-all active">
                            <i class="fas fa-th-large"></i> All Categories
                        </a>
                    </li>

                    <li v-for="cat in categorias" :key="cat.id">
                        <a href="javascript:void(0)" class="cat-accommodation" @click="filtrarEstablecimientos(cat.id)">
                            <i :class="cat.icono"></i> {{ cat.nombre }}
                        </a>
                    </li>


                </ul>
            </div>

            <!-- ===== LISTINGS ===== -->
            <div class="col-lg-9 anim fade-right anim-d2">
                <!-- Results bar -->
                <div class="results-bar d-none d-lg-flex">
                    <div class="result-count">Tu búsqueda obtuvo <strong>{{ totalResultados }}</strong> resultados</div>
                    <div class="d-flex align-items-center gap-2">
                        <select class="sort-select">
                            <option>SORT RESULTS BY</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>A-Z</option>
                            <option>Z-A</option>
                        </select>
                        <div class="view-options btn-group">
                            <a href="index.html" class="btn active"><i class="fas fa-th"></i></a>
                            <a href="listings-list.html" class="btn"><i class="fas fa-list"></i></a>
                        </div>
                    </div>
                </div>

                <!-- ROW 1 -->
                <div class="row">

                    <Tarjeta v-for="item in establecimientos" :key="item.id" :establecimiento="item" />




                    <TarjetaPlaceholder v-if="cargando" />
                 
        

                    <div v-if="!cargando && establecimientos.length == 0">
                        <p class="h3">No se encontraron establecimientos</p>
                    </div>

                </div>



                <!-- LOAD MORE -->
                <div class="text-center mt-3 mb-4">
                    <button class="btn-load-more" id="loadMoreBtn">LOAD MORE</button>
                </div>
            </div>
        </div>
    </div>




</template>