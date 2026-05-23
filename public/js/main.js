// ===== MAP FULLSCREEN TOGGLE =====
const mapBanner = document.getElementById('mapBanner');
const mapToggleBtn = document.getElementById('mapToggleBtn');
let mapExpanded = false;

mapToggleBtn.addEventListener('click', function () {
    mapExpanded = !mapExpanded;
    if (mapExpanded) {
        mapBanner.style.height = '500px';
        mapToggleBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        mapBanner.style.height = '280px';
        mapToggleBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
});

// ===== CURRENCY SELECTOR =====
document.querySelectorAll('.currency-selector span').forEach(function (el) {
    el.addEventListener('click', function () {
        document.querySelectorAll('.currency-selector span').forEach(function (s) {
            s.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// ===== LOAD MORE BUTTON (simulate) =====
const loadMoreBtn = document.getElementById('loadMoreBtn');
let loadCount = 0;

loadMoreBtn.addEventListener('click', function () {
    loadCount++;
    const listingsContainer = document.querySelector('.col-lg-9');
    const loadMoreWrapper = loadMoreBtn.parentElement;

    const newListings = [
        { category: 'FOOD & DINING', catClass: 'cat-beauty', title: 'The Grand Kitchen', address: '425 Mission St, San Francisco, CA 94105', featured: false },
        { category: 'AUTOMOTIVE', catClass: 'cat-automotive', title: 'Speed Auto Service', address: '800 N Michigan Ave, Chicago, IL 60611', featured: true },
        { category: 'TECHNOLOGY', catClass: 'cat-technology', title: 'Nova Tech Labs', address: '1600 Amphitheatre Pkwy, Mountain View, CA', featured: false }
    ];

    const row = document.createElement('div');
    row.className = 'row';

    newListings.forEach(function (listing) {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        col.innerHTML = `
            <div class="listing-card">
                <div class="card-img-wrapper">
                    <img src="img/placeholder.png" alt="Listing">
                    ${listing.featured ? '<span class="badge-featured">FEATURED</span>' : ''}
                </div>
                <div class="card-body">
                    <div class="card-category ${listing.catClass}">${listing.category}</div>
                    <h5 class="card-title">${listing.title}</h5>
                    <p class="card-address">${listing.address}</p>
                </div>
            </div>
        `;
        row.appendChild(col);
    });

    listingsContainer.insertBefore(row, loadMoreWrapper);

    if (loadCount >= 3) {
        loadMoreBtn.textContent = 'NO MORE RESULTS';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
        loadMoreBtn.style.cursor = 'not-allowed';
    }
});

// ===== VIEW TOGGLE (Grid / List) =====
document.querySelectorAll('.view-options .btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.view-options .btn').forEach(function (b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// ===== SMOOTH SCROLL TO TOP =====
document.querySelectorAll('.sidebar-categories a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        // Add active visual feedback
        document.querySelectorAll('.sidebar-categories a').forEach(function (a) {
            a.style.opacity = '0.7';
        });
        this.style.opacity = '1';
    });
});
