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
            <a class="navbar-brand" href="#">
                <i class="fas fa-globe"></i> WISEM DIRECTORY
            </a>
            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars text-white"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="mainNav">
                <ul class="navbar-nav align-items-lg-center">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">INICIO</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">ABOUT US</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">About Us</a></li>
                            <li><a class="dropdown-item" href="#">Our Team</a></li>
                            <li><a class="dropdown-item" href="#">Testimonials</a></li>
                            <li><a class="dropdown-item" href="#">FAQ</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">CATEGORIES</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">All Categories</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Accommodation</a></li>
                            <li><a class="dropdown-item" href="#">Business Services</a></li>
                            <li><a class="dropdown-item" href="#">Education &amp; Learning</a></li>
                            <li><a class="dropdown-item" href="#">Automotive</a></li>
                            <li><a class="dropdown-item" href="#">Fitness &amp; Health</a></li>
                            <li><a class="dropdown-item" href="#">Technology</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">PAGES</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="index.html">Listings Grid</a></li>
                            <li><a class="dropdown-item" href="listings-list.html">Listings List</a></li>
                            <li><a class="dropdown-item" href="listing-detail.html">Listing Detail</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="login.html">Login</a></li>
                            <li><a class="dropdown-item" href="register.html">Register</a></li>
                            <li><a class="dropdown-item" href="404.html">404 Page</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">BLOG</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">CONTACT</a>
                    </li>
                    <li class="nav-item ms-lg-3">
                        <a class="btn btn-submit-listing" href="#"><i class="fas fa-plus me-1"></i> SUBMIT LISTING</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


</template>