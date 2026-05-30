<script setup>

import { ref, onMounted, nextTick, watch } from 'vue';

import L from 'leaflet';

const map = ref(null);

const marker = ref(null);

const emit = defineEmits(['actualizar:coordenadas']);

const props = defineProps({
    coords: {
        type: Object,
        required: false,
    },
    draggable: {
        type: Boolean,
        default: true
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
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map.value)

    setTimeout(() => {
        map.value.invalidateSize();
    }, 100);


    marker.value = L.marker([-16.498200, -68.135580], { draggable: props.draggable }).addTo(map.value);

    marker.value.on('dragend', function (e) {

        const posicionActual = marker.value.getLatLng();

        emit('actualizar:coordenadas', {
            latitud: posicionActual.lat,
            longitud: posicionActual.lng
        })

    })
}

const obtenerUbicacion = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {

            const { latitude, longitude } = posicion.coords;

            map.value.setView([latitude, longitude], 13);

            if (marker.value) {
                marker.value.setLatLng([latitude, longitude]);
                emit('actualizar:coordenadas', {
                    latitud: latitude,
                    longitud: longitude
                })
            }
        })
    }

}



watch(() => props.coords, nuevasCoordenadas => {

    console.log("nuevas coords", nuevasCoordenadas);
    const { lat, lng } = nuevasCoordenadas;

    map.value.setView([lat, lng], 13);
    if (marker.value) {
        marker.value.setLatLng([lat, lng]);
    }
})


onMounted(() => {

    nextTick(() => {
        iniciarMapa();
    })

    if(props.draggable){
        obtenerUbicacion()
    }


})





</script>

<template>

    <section class="map-banner" id="mapBanner">

        <div id="map-canvas"  :class="{'no-draggable': !props.draggable}" ></div>

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

#map-canvas.no-draggable{

    min-height: 200px;
}

</style>