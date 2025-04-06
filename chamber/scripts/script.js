// Correct API URL format
const LAT = -18.9178;
const LON = 47.4724;
const API_KEY = 'ae319551d33a1c811524f76d19861a06';

// Weather Functions
async function getWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`)
        ]);

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        updateWeather(currentData);
        updateForecast(forecastData);
    } catch (error) {
        console.error('Weather error:', error);
        document.getElementById('weather-container').innerHTML = 
            '<p>Weather information currently unavailable</p>';
    }
}

function capitalize(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function updateWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather.map(w => capitalize(w.description)).join(', ');
    const humidity = data.main.humidity;

    document.getElementById('currentTemp').textContent = `${temp}°C`;
    document.getElementById('weatherDesc').textContent = desc;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    
    const icon = document.getElementById('weather-icon');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
}

function updateForecast(data) {
    const forecastContainer = document.getElementById('threeDayForecast');
    const dailyForecast = data.list.filter(item => 
        item.dt_txt.includes('12:00:00')
    ).slice(0, 3);

    forecastContainer.innerHTML = dailyForecast.map(day => `
        <div class="forecast-day">
            <h4>${new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}</h4>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                 alt="${day.weather[0].description}"
                 loading="lazy">
            <p>${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</p>
            <p>${capitalize(day.weather[0].description)}</p>
        </div>
    `).join('');
}

// Member Spotlight Functions
async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        
        // Filter and randomize members
        const qualifiedMembers = data.filter(member => 
            member.membershipLevel >= 2
        );
        
        const shuffledMembers = qualifiedMembers
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        displaySpotlights(shuffledMembers);
    } catch (error) {
        console.error('Spotlight error:', error);
        document.getElementById('memberSpotlights').innerHTML = 
            '<p>Featured members information is currently unavailable</p>';
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('memberSpotlights');
    container.innerHTML = members.map(member => `
        <div class="spotlight-card">
            <img src="images/${member.image.replace(' ', '-')}" 
                 alt="${member.name}" 
                 loading="lazy">
            <div class="spotlight-content">
                <h3>${member.name}</h3>
                <p class="address">${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="membership ${member.membershipLevel === 3 ? 'gold' : 'silver'}">
                    ${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}
                </p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </div>
        </div>
    `).join('');
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');

  hamburger.addEventListener('click', () => {
      navList.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navList.classList.contains('active'));
  });

  // Footer Dates
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;

  // Load content
  getWeather();
  loadSpotlights();
});

// Member Data
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

// View Toggle
document.getElementById('gridView').addEventListener('click', () => toggleView(false));
document.getElementById('listView').addEventListener('click', () => toggleView(true));

function toggleView(isList) {
    document.querySelectorAll('.view-toggle button').forEach(btn => 
        btn.classList.remove('active'));
    document.getElementById(isList ? 'listView' : 'gridView').classList.add('active');
    document.querySelector('.business-cards').className = 
        `business-cards ${isList ? 'list-view' : 'grid-view'}`;
}

// Initialize
async function initialize() {
    try {
      const data = await fetchMembers();
      if (data.members?.length) {
        renderMembers(data.members);
      } else {
        console.warn('No member data available');
        document.querySelector('.business-cards').innerHTML = 
          '<p>No member listings available at this time.</p>';
      }
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }
/// Join page
// Set form timestamp
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Open modals
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            modal.showModal();
        });
    });

    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('dialog');
            modal.close();
        });
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            const dialogDimensions = modal.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                modal.close();
            }
        });
    });
});