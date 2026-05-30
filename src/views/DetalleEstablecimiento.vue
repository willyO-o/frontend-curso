<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

import { getEstablecimientoId } from '@/services/establecimientoService'

import Mapa from '@/components/Mapa.vue';

import { useRoute } from 'vue-router';


import { storeServicio } from '@/services/servicioService'

import { Modal } from 'bootstrap';

import IconPicker from '@/components/IconPicker.vue';

const route = useRoute();
const establecimiento = ref({
    latitud: 0,
    longitud: 0,
});




const cargarEstablecimientoId = async () => {



    const id = route.params.id;

    const resultado = await getEstablecimientoId(id)

    establecimiento.value = resultado.data

    console.log(establecimiento.value);

}

const horaInstante = ref(null)

const isOpen = computed(() => {

    if (!establecimiento.value.horario_apertura || !establecimiento.value.horario_cierre) return false





    return horaInstante.value >= establecimiento.value.horario_apertura &&
        horaInstante.value <= establecimiento.value.horario_cierre;

})


const intervaloHora = setInterval(() => {

    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    horaInstante.value = `${hora}:${minutos}`;
}, 1000);



// servicios

const servicio = reactive({
    establecimiento_id: '',
    nombre_servicio: '',
    descripcion_servicio: '',
    precio: '',
    tipo: '',
    icono: '',
    disponible: ''
})

const guardarServicio = async () => {


    try {

        const resultado = await storeServicio(servicio)

        console.log('Servicio guardado:', resultado.data);


    } catch (error) {
        console.log('Error al guardar el servicio:', error);
    }


}


const modal = ref(null);

const mostrarModal = () => {

    const modalElement = document.querySelector('#servicioModal');

    if (!modal.value) {
        modal.value = new Modal(modalElement);
    }

    modal.value.show();
}


const iconos = ref([]);

const actualizarIcono = nuevoIcono => {
    servicio.icono = nuevoIcono;
    console.log('Ícono actualizado:', servicio.icono);
    
}




onMounted(() => {


    cargarEstablecimientoId();

    mostrarModal()

    fetch('/data/fontawesome-icons.json')
    .then(response => response.json())
    .then(data => {
        iconos.value = data;
     
    })
})

onUnmounted(() => {
    clearInterval(intervaloHora);

})





</script>

<template>
    <!-- ==================== PAGE BANNER ==================== -->
    <section class="page-banner">
        <div class="page-banner-overlay">
            <div class="container text-center">
                <h1>Listing Detail</h1>
                <p class="breadcrumb-text"><a href="index.html">Home</a> / <a href="index.html">Listings</a> / Ridenow
                    Sports</p>
            </div>
        </div>
    </section>
    <div class="container detail-page py-5">
        <div class="row">

            <!-- ===== MAIN CONTENT ===== -->
            <div class="col-lg-8 mb-4">

                <!-- Listing Header Card -->
                <div class="detail-header-card anim scale-in">
                    <div class="detail-gallery">
                        <img :src="establecimiento.url_imagen" alt="Ridenow Sports" class="detail-main-img">
                    </div>
                    <div class="detail-header-body">
                        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                            <div>
                                <span class="detail-category cat-automotive">{{ establecimiento.categoria?.nombre
                                    }}</span>
                                <h2 class="detail-title">{{ establecimiento.nombre }}</h2>
                            </div>
                            <span class="detail-badge-open" :class="{ 'bg-danger': !isOpen }"><i
                                    class="fas fa-clock me-1"></i>
                                {{ isOpen ? 'Abierto Ahora' : 'Cerrado' }}
                            </span>
                        </div>
                        <p class="detail-address">
                            <i class="fas fa-map-marker-alt"></i>
                            {{ establecimiento.direccion }}
                        </p>
                        <div class="detail-contact-row">
                            <span><i class="fas fa-phone-alt"></i> {{ establecimiento.telefono }}</span>
                            <span v-if="establecimiento.email"><i class="fas fa-envelope"></i> <a
                                    :href="`mailto:${establecimiento.email}`">{{ establecimiento.email }}</a></span>
                            <span v-if="establecimiento.website"><i class="fas fa-globe"></i> <a
                                    :href="establecimiento.website" target="_blank">{{ establecimiento.website
                                    }}</a></span>
                        </div>
                        <div class="detail-rating mt-2 d-none">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span class="rating-text">4.5 (28 Reviews)</span>
                        </div>
                    </div>
                </div>

                <!-- About Section -->
                <div class="detail-section anim fade-up">
                    <h4 class="detail-section-title"><i class="fas fa-info-circle me-2"></i>
                        Descripción
                    </h4>
                    <p>{{ establecimiento.descripcion }}</p>

                </div>

                <!-- Services & Products Section -->
                <div class="detail-section anim fade-up anim-d1">
                    <h4 class="detail-section-title"><i class="fas fa-concierge-bell me-2"></i>
                        Servicios / Productos
                    </h4>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="service-card">
                                <div class="service-icon"><i class="fas fa-motorcycle"></i></div>
                                <div class="service-info">
                                    <h6>Motorcycle Sales</h6>
                                    <p>Wide selection of new and pre-owned motorcycles from top brands.</p>
                                    <span class="service-price">From $3,500</span>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 mb-3">
                            <a href="javascript:void(0)" class="text-decoration-none" @click="mostrarModal">
                                <div class="service-card d-flex align-items-center justify-content-center">
                                    <div class="service-icon">
                                        <i class="fas fa-plus"></i>
                                    </div>
                                    <div class="service-info">
                                        <h6>
                                            Agregar Servicio/Producto
                                        </h6>

                                    </div>
                                </div>

                            </a>

                        </div>
                    </div>
                </div>

                <!-- Photo Gallery -->
                <div class="detail-section anim fade-up anim-d2 d-none">
                    <h4 class="detail-section-title"><i class="fas fa-images me-2"></i>Photo Gallery</h4>
                    <div class="detail-gallery-grid">
                        <div class="gallery-thumb"><img src="/img/placeholder.png" alt="Gallery 1"></div>
                        <div class="gallery-thumb"><img src="/img/placeholder.png" alt="Gallery 2"></div>
                        <div class="gallery-thumb"><img src="/img/placeholder.png" alt="Gallery 3"></div>
                        <div class="gallery-thumb"><img src="/img/placeholder.png" alt="Gallery 4"></div>
                        <div class="gallery-thumb"><img src="/img/placeholder.png" alt="Gallery 5"></div>
                        <div class="gallery-thumb"><img src="/img/placeholder.png" alt="Gallery 6"></div>
                    </div>
                </div>

                <!-- Reviews -->
                <div class="detail-section anim fade-up anim-d3 d-none">
                    <h4 class="detail-section-title"><i class="fas fa-comments me-2"></i>Reviews (3)</h4>

                    <div class="review-item">
                        <div class="review-avatar"><i class="fas fa-user"></i></div>
                        <div class="review-body">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>John Doe</strong>
                                <span class="review-date">Feb 15, 2026</span>
                            </div>
                            <div class="review-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p>Excellent service! The team was very professional and helped me find exactly what I
                                needed. Highly recommended for anyone looking for quality motorcycles.</p>
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-avatar"><i class="fas fa-user"></i></div>
                        <div class="review-body">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>Jane Smith</strong>
                                <span class="review-date">Jan 28, 2026</span>
                            </div>
                            <div class="review-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="far fa-star"></i>
                            </div>
                            <p>Great selection of vehicles and accessories. The financing process was smooth and
                                straightforward. Would definitely visit again.</p>
                        </div>
                    </div>

                    <div class="review-item">
                        <div class="review-avatar"><i class="fas fa-user"></i></div>
                        <div class="review-body">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong>Mike Johnson</strong>
                                <span class="review-date">Dec 10, 2025</span>
                            </div>
                            <div class="review-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                    class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                            </div>
                            <p>Brought my bike in for maintenance and was impressed by the quality of work. Fair pricing
                                and they completed everything on time as promised.</p>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ===== SIDEBAR ===== -->
            <div class="col-lg-4 anim fade-right anim-d2">

                <!-- Business Hours -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-clock me-2"></i>
                        Horario de Atención
                    </h5>
                    <ul class="business-hours">
                        <li><span>Lunes</span>
                            <span>
                                {{ establecimiento.horario_apertura }} -
                                {{ establecimiento.horario_cierre }}
                            </span>
                        </li>
                        <li><span>Martes</span>
                            <span> {{ establecimiento.horario_apertura }} -
                                {{ establecimiento.horario_cierre }}
                            </span>
                        </li>
                        <li><span>Miércoles</span>
                            <span> {{ establecimiento.horario_apertura }} -
                                {{ establecimiento.horario_cierre }}
                            </span>
                        </li>
                        <li><span>Jueves</span>
                            <span> {{ establecimiento.horario_apertura }} -
                                {{ establecimiento.horario_cierre }}
                            </span>
                        </li>
                        <li><span>Viernes</span>
                            <span> {{ establecimiento.horario_apertura }} -
                                {{ establecimiento.horario_cierre }}</span>
                        </li>
                        <li><span>Sábado</span>
                            <span> {{ establecimiento.horario_apertura }} -
                                {{ establecimiento.horario_cierre }}</span>
                        </li>
                        <li class="closed"><span>Domingo</span><span>Cerrado</span></li>
                    </ul>
                </div>

                <!-- Location Map -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-map-marked-alt me-2"></i>Location</h5>
                    <div class="sidebar-map">
                        <Mapa :draggable="false"
                            :coords="{ lat: establecimiento.latitud, lng: establecimiento.longitud }" />
                    </div>
                </div>

                <!-- Contact -->
                <div class="detail-sidebar-card d-none">
                    <h5 class="sidebar-card-title"><i class="fas fa-envelope me-2"></i>Send a Message</h5>
                    <form class="sidebar-contact-form">
                        <input type="text" class="form-control" placeholder="Your Name">
                        <input type="email" class="form-control" placeholder="Your Email">
                        <textarea class="form-control" rows="3" placeholder="Your Message"></textarea>
                        <button type="submit" class="btn btn-send-message w-100">
                            <i class="fas fa-paper-plane me-1"></i> SEND MESSAGE
                        </button>
                    </form>
                </div>

                <!-- Social Share -->
                <div class="detail-sidebar-card">
                    <h5 class="sidebar-card-title"><i class="fas fa-share-alt me-2"></i>Compartir</h5>
                    <div class="detail-social-share">
                        <a href="#" class="share-btn share-facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="share-btn share-twitter"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="share-btn share-google"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="share-btn share-linkedin"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="share-btn share-pinterest"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </div>




    <!-- Modal -->
    <div class="modal fade" id="servicioModal" tabindex="-1" aria-labelledby="servicioModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="servicioModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="registerForm">
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-8 mb-3">
                                <label for="nombre_servicio" class="form-label">
                                    Nombre Producto / Servicio
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-tag"></i></span>
                                    <input type="text" class="form-control" id="nombre_servicio" name="nombre_servicio"
                                        required>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="precio" class="form-label">Precio
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text">Bs.</span>
                                    <input type="number" class="form-control" id="precio" name="precio" required>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="descripcion_servicio" class="form-label">Descripción
                                <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <textarea class="form-control" id="descripcion_servicio"
                                    name="descripcion_servicio"></textarea>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="tipo" class="form-label">Tipo
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    <select name="tipo" id="tipo" class="form-select">
                                        <option value="PRODUCTO">Producto</option>
                                        <option value="SERVICIO">Servicio</option>
                                    </select>

                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="disponible" class="form-label">Disponible
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    <select name="disponible" id="disponible" class="form-select">
                                        <option :value="true">Activo</option>
                                        <option :value="false">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div class="mb-3">
                            <label for="descripcion_servicio" class="form-label">Icono
                                <span class="text-danger">*</span>
                            </label>
                            <IconPicker  :icons="iconos" :modelValue="servicio.icono"
                            
                            @update:modelValue="actualizarIcono"/>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i>
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>


</template>