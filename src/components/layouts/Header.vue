<script setup>

</script>


<template>

        <!-- ==================== TOP BAR ==================== -->
    <div class="top-bar">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <span>WELCOME TO THE WISEM LISTINGS</span>
                <div class="d-flex align-items-center">
                    <a href="login.html">LOGIN</a>
                    <span class="separator">|</span>
                    <a href="register.html">REGISTER</a>
                    <div class="currency-selector ms-4">
                        <span class="active">$ USD</span>
                        <span>€ EUR</span>
                        <span>£ GBP</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ==================== NAVBAR ==================== -->
    <nav class="navbar navbar-expand-lg main-navbar">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{name: 'Inicio'}">
                <i class="fas fa-globe"></i> Establecimientos
            </RouterLink>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                <ul class="navbar-nav align-items-lg-center">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{name: 'Inicio'}">INICIO</RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fas fa-user-circle"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Panel</a></li>
                            <li><a class="dropdown-item" href="#">Perfil</a></li>
                            <li><a class="dropdown-item" href="#">Cerrar Sesión</a></li>
                            <li><RouterLink class="dropdown-item" :to="{name:'CrearEstablecimiento'}">Crear Establecimiento</RouterLink></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">BLOG</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">CONTACT</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>


</template>