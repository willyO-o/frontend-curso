<script setup>

import Mapa from '@/components/Mapa.vue';



</script>

<template>



    <!-- ==================== MAP BANNER ==================== -->

    <Mapa />



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
        <h3>BUSINESS SERVICES \ INSURANCE <span>[52]</span></h3>
    </div>

    <!-- ==================== MAIN CONTENT ==================== -->
    <div class="container pb-5">
        <div class="row">
            <!-- ===== SIDEBAR ===== -->
            <div class="col-lg-3 mb-4 anim fade-left">
                <!-- Results bar (above sidebar on mobile) -->
                <div class="results-bar d-lg-none">
                    <div class="result-count">Your search returned <strong>52</strong> results</div>
                </div>
                <ul class="sidebar-categories">
                    <li><a href="#" class="cat-all active"><i class="fas fa-th-large"></i> All Categories</a></li>
                    <li><a href="#" class="cat-accommodation"><i class="fas fa-bed"></i> Accommodation</a></li>
                    <li><a href="#" class="cat-business"><i class="fas fa-briefcase"></i> Business Services</a></li>
                    <li><a href="#" class="cat-education"><i class="fas fa-graduation-cap"></i> Education & Learning</a>
                    </li>
                    <li><a href="#" class="cat-references"><i class="fas fa-bookmark"></i> References</a></li>
                    <li><a href="#" class="cat-automotive"><i class="fas fa-car"></i> Automotive</a></li>
                    <li><a href="#" class="cat-fitness"><i class="fas fa-heartbeat"></i> Fitness & Health</a></li>
                    <li><a href="#" class="cat-sports"><i class="fas fa-futbol"></i> Sports & Adventure</a></li>
                    <li><a href="#" class="cat-regional"><i class="fas fa-map-marker-alt"></i> Regional</a></li>
                    <li><a href="#" class="cat-hotels"><i class="fas fa-plane"></i> Hotels & Travel</a></li>
                    <li><a href="#" class="cat-technology"><i class="fas fa-microchip"></i> Technology</a></li>
                </ul>
            </div>

            <!-- ===== LISTINGS ===== -->
            <div class="col-lg-9 anim fade-right anim-d2">
                <!-- Results bar -->
                <div class="results-bar d-none d-lg-flex">
                    <div class="result-count">Your search returned <strong>52</strong> results</div>
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
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-automotive">AUTOMOTIVE</div>
                                    <h5 class="card-title">Ridenow Sports</h5>
                                    <p class="card-address">17202 N Cave Creek Rd, Phoenix, AZ 85032</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                    <span class="badge-featured">FEATURED</span>
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-beauty">BEAUTY & SPA</div>
                                    <h5 class="card-title">Amicus Hair and Beauty</h5>
                                    <p class="card-address">5198 Macarthur Blvd NW Unit B, Washington, DC 20016</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                    <span class="badge-featured">FEATURED</span>
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-entertainment">ENTERTAINMENT</div>
                                    <h5 class="card-title">Blue Room Cinebar</h5>
                                    <p class="card-address">2306 Almaden Road, San Jose, CA 95125</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- ROW 2 -->
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-music">MUSIC</div>
                                    <h5 class="card-title">Zoom Melodey</h5>
                                    <p class="card-address">2306 Almaden Road, San Jose, CA 95125</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                    <span class="badge-featured">FEATURED</span>
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-travel">TRAVEL</div>
                                    <h5 class="card-title">Skyware Journey</h5>
                                    <p class="card-address">5198 Macarthur Blvd NW Unit B, Washington, DC 20016</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-education">EDUCATION</div>
                                    <h5 class="card-title">Sam Tutor Center</h5>
                                    <p class="card-address">17202 N Cave Creek Rd, Phoenix, AZ 85032</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- ROW 3 -->
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-business">BUSINESS</div>
                                    <h5 class="card-title">Associate Inc.</h5>
                                    <p class="card-address">17202 N Cave Creek Rd, Phoenix, AZ 85032</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-technology">TECHNOLOGY</div>
                                    <h5 class="card-title">Alitay Technologies</h5>
                                    <p class="card-address">5198 Macarthur Blvd NW Unit B, Washington, DC 20016</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-6">
                        <a href="listing-detail.html" class="listing-card-link">
                            <div class="listing-card">
                                <div class="card-img-wrapper">
                                    <img src="./img/placeholder.png" alt="Listing">
                                </div>
                                <div class="card-body">
                                    <div class="card-category cat-woman">WOMAN</div>
                                    <h5 class="card-title">Ghespoke Wear</h5>
                                    <p class="card-address">2306 Almaden Road, San Jose, CA 95125</p>
                                </div>
                            </div>
                        </a>
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