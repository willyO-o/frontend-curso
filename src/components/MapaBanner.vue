<script setup>

import { ref, onMounted, nextTick, watch } from 'vue';

import L from 'leaflet';

const map = ref(null);


const emit = defineEmits(['actualizar:coordenadas']);

const popupsMarcadores = ref({});

const grupoMarcadores = ref(null);

const props = defineProps({

    establecimientos: {
        type: Array,
        required: true,
    },
    coordenadasEnfoque: {
        type: Object,
        default: null
    }
})


const iniciarMapa = () => {

    if (map.value) {
        map.value.remove();
    }

    map.value = L.map('map-canvas').setView([-16.498200, -68.135580], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);


    setTimeout(() => {
        map.value.invalidateSize();
    }, 100);


}


const actualizarMarcadores = (listado) => {

    if (!map.value) return;

    if (!grupoMarcadores.value) {
        grupoMarcadores.value = L.layerGroup().addTo(map.value);
    } else {
        grupoMarcadores.value.clearLayers();
    }

    listado.forEach(item => {

        var myIcon = L.divIcon({
            iconSize: [30,42],
            iconAnchor: [15, 42],
            // popupAnchor: [-3, -76],
            // shadowSize: [68, 95],
            // shadowAnchor: [22, 94],
            html: /*html */ `
               <div class="pin-marcador" >
                <i class="${item.categoria.icono}"></i>
                </div>
            `
        });

        const popup =  /*html */ `
            <b>${item.nombre} </b> <br>
            <span> ${item.direccion} </span>
        `

        const marcador = L.marker([item.latitud, item.longitud], { icon:myIcon })
        .addTo(grupoMarcadores.value)
        .bindPopup(popup);



        popupsMarcadores.value[item.id] = marcador

    });


}


watch(() => props.establecimientos, nuevoListado => {
    actualizarMarcadores(nuevoListado);
}, { immediate: true })

watch(() =>props.coordenadasEnfoque, nuevoEnfoque => {

    if(nuevoEnfoque.latitud && nuevoEnfoque.longitud){
        map.value.flyTo([nuevoEnfoque.latitud, nuevoEnfoque.longitud], 17)
        popupsMarcadores.value[nuevoEnfoque.id].openPopup();

    }


})





onMounted(() => {

    nextTick(() => {
        iniciarMapa();
    })




})





</script>

<template>

    <section class="map-banner" id="mapBanner">

        <div id="map-canvas"></div>

        <button type="button" class="map-fullscreen-btn" id="mapToggleBtn" title="Toggle Fullscreen Map">
            <i class="fas fa-expand"></i>
        </button>
    </section>
</template>


<style scoped>
#map-canvas {
    width: 100%;
    min-height: 500px;
}

#map-canvas.no-draggable {

    min-height: 200px;
}
</style>