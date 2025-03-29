
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});



document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');


slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentSlide = index;
}


document.querySelector('.slider-prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.querySelector('.slider-next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});


let autoSlide = setInterval(() => showSlide(currentSlide + 1), 5000);


const slider = document.querySelector('.hero-slider');
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => showSlide(currentSlide + 1), 5000);
});


showSlide(0);

async function loadBusinesses() {
    try {
        const response = await fetch('data/members.json');
        const businesses = await response.json();
        displayBusinesses(businesses.slice(0, 3));
    } catch (error) {
        console.error('Error loading businesses:', error);
        document.querySelector('.business-cards').innerHTML = 
            '<p>Error loading business listings. Please try again later.</p>';
    }
}

function displayBusinesses(businesses) {
    const container = document.querySelector('.business-cards');
    if (!container) return;
    
    container.innerHTML = businesses.length ? businesses.map(business => `
    <div class="business-card">
        <img src="images/${business.image}" alt="${business.name}"  style="height: 100px; width: 100px;">
        <h3>${business.name}</h3>
        <p>${business.address}</p>
        <p>📞 ${business.phone}</p>
        <p>${business.membershipLevel} Member</p>
        <a href="${business.website}" target="_blank">Visit Website</a>
  </div>
  `).join('') : '<p>No businesses found</p>';
}

loadBusinesses();

