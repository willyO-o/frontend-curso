<script setup>


import MapaBanner from '@/components/MapaBanner.vue';

import { ref, onMounted, } from 'vue';
import { useStorage } from '@vueuse/core'


import { getEstablecimientosPublic } from '@/services/establecimientoService'
import { getCategorias } from '@/services/categoriaService'
import Tarjeta from '@/components/Tarjeta.vue';
import TarjetaPlaceholder from '@/components/TarjetaPlaceholder.vue';



const establecimientos = ref([])

const categorias = ref([])

const cargando = ref(false)

const grid = useStorage('grid', true)

const parametrosBusqueda = ref({
    search: '',
    categoria_id: null,
    per_page: 6,
    page: 1,
    orden: 'reciente',

})


const totalResultados = ref(0)



const cargarCategorias = async () => {
    const resultado = await getCategorias()

    categorias.value = resultado.data
}


const cargarEstablecimientos = async () => {


    // establecimientos.value = []
    cargando.value = true;
    const resultado = await getEstablecimientosPublic(parametrosBusqueda.value)

    establecimientos.value = [...establecimientos.value, ...resultado.data]

    totalResultados.value = resultado.total

    cargando.value = false;

}


const filtrarEstablecimientos = idCategoria => {

    parametrosBusqueda.value.categoria_id = idCategoria;

    establecimientos.value = []
    cargarEstablecimientos()
}


const limpiarFiltros = () => {
    parametrosBusqueda.value = {
        search: '',
        categoria_id: null,
        per_page: 6,
        page: 1,
        orden: 'reciente',
    }
    establecimientos.value = []
    cargarEstablecimientos()
}


const datosEnfoque = ref({})
const enfocarMapa = datosEstablecimiento => {

    setTimeout(() => {
        datosEnfoque.value = datosEstablecimiento

    }, 400);

    const contenedorMapa = document.getElementById('mapBanner')

    if (!contenedorMapa) return;

    contenedorMapa.scrollIntoView({ behavior: 'smooth', block: 'center' })

}

const cargarMasResultados = () => {

    parametrosBusqueda.value.page++;
    cargarEstablecimientos()    

}


onMounted(() => {

    cargarCategorias();
    cargarEstablecimientos()

})




</script>

<template>



    <!-- ==================== MAP BANNER ==================== -->

    <MapaBanner :establecimientos="establecimientos" :coordenadasEnfoque="datosEnfoque" />



    <!-- ==================== RESERVATION / SEARCH SECTION ==================== -->
    <section class="reservation-section">
        <div class="container">
            <h2 class="anim fade-down">Encuentra tu lugar ideal</h2>
            <div class="search-bar-wrapper anim fade-up anim-d2">
                <select v-model="parametrosBusqueda.categoria_id" class="form-select" style="flex:1; min-width:160px;">
                    <option :value="null">Seleccionar Categoría</option>
                    <option v-for="cate in categorias" :key="cate.id" :value="cate.id">{{ cate.nombre }}</option>

                </select>
                <div class="input-with-icon">
                    <input v-model="parametrosBusqueda.search" type="text" class="form-control"
                        placeholder="Buscar por nombre o direccion">
                    <i class="fas fa-map-marker-alt icon-right"></i>
                </div>

                <button class=" btn-find" @click="cargarEstablecimientos">Buscar</button>
                <button class="btn  btn-danger" @click="limpiarFiltros"> Limpiar </button>
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
                        <a @click="filtrarEstablecimientos(null)" href="javascript:void(0)" class="cat-all "
                            :class="{ 'active': parametrosBusqueda.categoria_id == null }">
                            <i class="fas fa-th-large"></i> Todas las categorías
                        </a>
                    </li>

                    <li v-for="cat in categorias" :key="cat.id">
                        <a href="javascript:void(0)" :class="{ 'active': parametrosBusqueda.categoria_id == cat.id }"
                            class="cat-accommodation" @click="filtrarEstablecimientos(cat.id)">
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
                        <select class="sort-select" v-model="parametrosBusqueda.orden" @change="cargarEstablecimientos">
                            <option value="reciente" selected>Recientes</option>
                            <option value="antiguo">Antiguos</option>
                            <option value="az">A-Z</option>
                            <option value="za">Z-A</option>
                        </select>
                        <div class="view-options btn-group">
                            <a href="javascript:void(0)" class="btn" :class="{ 'active': grid }" @click="grid = true"><i
                                    class="fas fa-th"></i></a>
                            <a href="javascript:void(0)" class="btn" :class="{ 'active': !grid }"
                                @click="grid = false"><i class="fas fa-list"></i></a>
                        </div>
                    </div>
                </div>

                <!-- ROW 1 -->
                <div :class="{ 'row': grid, 'listing-list-view': !grid }">

                    <Tarjeta v-for="item in establecimientos" :key="item.id" :grid="grid" :establecimiento="item"
                        @ver-en-mapa="enfocarMapa" />




                    <TarjetaPlaceholder v-if="cargando" />



                    <div v-if="!cargando && establecimientos.length == 0">
                        <p class="h3">No se encontraron establecimientos</p>
                    </div>

                </div>



                <!-- LOAD MORE -->
                <div class="text-center mt-3 mb-4">
                    <button class="btn-load-more" id="loadMoreBtn"
                        v-if="totalResultados > establecimientos.length"
                        @click="cargarMasResultados"
                    >Ver más</button>
                </div>
            </div>
        </div>
    </div>




</template>