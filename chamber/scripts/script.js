
async function getWeather() {
    try {
        // Current Weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat='-18.9178'&lon='47.4724'&units=metric&appid=ae319551d33a1c811524f76d19861a06`
        );
        const currentData = await currentResponse.json();
        
        // Forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat='-18.9178'&lon='47.4724'&units=metric&appid=ae319551d33a1c811524f76d19861a06`
        );
        const forecastData = await forecastResponse.json();

        updateWeather(currentData);
        updateForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function capitalize(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

function updateWeather(data) {
    document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-description').textContent = 
        data.weather.map(w => capitalize(w.description)).join(', ');
    document.getElementById('humidity').textContent = data.main.humidity;
    
    const icon = document.getElementById('weather-icon');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
}

function updateForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    forecastContainer.innerHTML = dailyForecast.slice(0, 3).map(day => `
        <div class="forecast-day">
            <h4>${new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}</h4>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                 alt="${day.weather[0].description}" loading="lazy">
            <p>${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</p>
            <p>${capitalize(day.weather[0].description)}</p>
        </div>
    `).join('');
}

async function loadSpotlights() {
  try {
      const response = await fetch('data/members.json');
      const data = await response.json();
      const qualified = data.members.filter(m => m.membershipLevel >= 2);
      const spotlights = qualified.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      const container = document.getElementById('memberSpotlights');
      container.innerHTML = spotlights.map(member => `
          <div class="spotlight-card">
              <img src="images/${member.image}" alt="${member.name}" loading="lazy">
              <h3>${member.name}</h3>
              <p>${member.address}</p>
              <p>${member.phone}</p>
              <p class="membership-badge">${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</p>
              <a href="${member.website}" target="_blank">Visit Site</a>
          </div>
      `).join('');
  } catch (error) {
      console.error('Error loading spotlights:', error);
  }
}

// Initialize based on page
if (document.querySelector('.hero-home')) {
  initHomePage();
}
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