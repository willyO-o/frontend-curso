<script setup>


const props = defineProps({
    establecimiento: {
        type: Object,
        required: true
    },
    grid: {
        type: Boolean,
        default: true
    }

})

const emit = defineEmits(['ver-en-mapa'])

</script>



<template>
    <div v-if="grid" class="col-md-4 col-sm-6">
        <a class="listing-card-link">
            <div class="listing-card">
                <div class="card-img-wrapper">
                    <img :src="establecimiento.url_imagen" alt="Listing">
                    <span class="badge-featured"> NUEVO </span>
                </div>
                <div class="card-body">
                    <div class="card-category cat-beauty">{{ establecimiento.categoria.nombre }}</div>
                    <h5 class="card-title">
                        <RouterLink class="text-decoration-none"
                            :to="{ name: 'DetalleEstablecimiento', params: { id: establecimiento.id } }">
                            {{ establecimiento.nombre }}
                        </RouterLink>
                    </h5>
                    <p class="card-address">{{ establecimiento.direccion }}</p>
                    <a @click="emit('ver-en-mapa', establecimiento)" href="javascript:void(0)"
                        class="text-decoration-none card-link">
                        <i class="fas fa-map-marker-alt"></i>
                        Ver en el mapa
                    </a>
                </div>
            </div>
        </a>
    </div>


    <a v-else class="listing-list-item-link">
        <div class="listing-list-item">
            <div class="listing-list-img">
                <img :src="establecimiento.url_imagen" alt="Listing">
            </div>
            <div class="listing-list-content">
                <div class="listing-list-category cat-automotive">{{ establecimiento.categoria.nombre }}</div>
                <h5 class="listing-list-title">
                    <RouterLink class="text-decoration-none"
                        :to="{ name: 'DetalleEstablecimiento', params: { id: establecimiento.id } }">
                        {{ establecimiento.nombre }}
                    </RouterLink>
                </h5>
                <p class="listing-list-address">
                    {{ establecimiento.direccion }}
                    <span class="listing-list-phone"><i class="fas fa-phone-alt"></i> {{ establecimiento.telefono }}
                    </span>
                </p>
                <p class="listing-list-desc">
                    {{ establecimiento.descripcion }}
                </p>
                <a @click="emit('ver-en-mapa', establecimiento)" href="javascript:void(0)"
                    class="text-decoration-none card-link">
                    <i class="fas fa-map-marker-alt"></i>
                    Ver en el mapa
                </a>
            </div>
        </div>
    </a>
</template>