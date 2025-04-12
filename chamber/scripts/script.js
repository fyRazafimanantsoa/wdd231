// Utility Functions
const Utils = {
    capitalize: str => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    
    handleError: (elementId, message) => {
        console.error(message);
        if(elementId) document.getElementById(elementId).innerHTML = 
            `<p class="error">${message}</p>`;
    },

    fetchData: async (url, errorMessage) => {
        try {
            const response = await fetch(url);
            if(!response.ok) throw new Error(errorMessage || 'Failed to fetch data');
            return await response.json();
        } catch(error) {
            Utils.handleError(null, error.message);
            return null;
        }
    }
};

// Navigation Module
const Navigation = {
    init: () => {
        const hamburger = document.querySelector('.hamburger');
        const navList = document.querySelector('.nav-list');
        
        hamburger?.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navList.classList.contains('active'));
        });
    }
};

// Weather Module
const Weather = {
    LAT: -18.9178,
    LON: 47.4724,
    API_KEY: 'ae319551d33a1c811524f76d19861a06',

    init: async () => {
        if(!document.getElementById('weather-container')) return;
        
        try {
            const [current, forecast] = await Promise.all([
                Weather.fetchWeather('weather'),
                Weather.fetchWeather('forecast')
            ]);
            Weather.updateDisplay(current, forecast);
        } catch(error) {
            Utils.handleError('weather-container', 'Weather data unavailable');
        }
    },

    fetchWeather: async (type) => {
        const endpoint = type === 'weather' ? 'weather' : 'forecast';
        return Utils.fetchData(
            `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${Weather.LAT}&lon=${Weather.LON}&units=metric&appid=${Weather.API_KEY}`,
            'Failed to load weather data'
        );
    },

    updateDisplay: (current, forecast) => {
        document.getElementById('currentTemp').textContent = `${Math.round(current.main.temp)}°C`;
        document.getElementById('weatherDesc').textContent = 
            current.weather.map(w => Utils.capitalize(w.description)).join(', ');
        document.getElementById('humidity').textContent = `Humidity: ${current.main.humidity}%`;

        const icon = document.getElementById('weather-icon');
        icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
        icon.alt = current.weather[0].description;

        const forecastHTML = forecast.list
            .filter(item => item.dt_txt.includes('12:00:00'))
            .slice(0, 3)
            .map(day => `
                <div class="forecast-day">
                    <h4>${new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}</h4>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" 
                         alt="${day.weather[0].description}"
                         loading="lazy">
                    <p>${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</p>
                    <p>${Utils.capitalize(day.weather[0].description)}</p>
                </div>
            `).join('');
        document.getElementById('threeDayForecast').innerHTML = forecastHTML;
    }
};

// Members Module
const Members = {
    init: async () => {
        if(!document.querySelector('.business-cards, #memberSpotlights')) return;
        
        const data = await Utils.fetchData('data/members.json', 'Failed to load member data');
        if(!data) return;

        if(document.getElementById('memberSpotlights')) {
            Members.displaySpotlights(data.filter(m => m.membershipLevel >= 2));
        }
        
        if(document.querySelector('.business-cards')) {
            Members.displayBusinesses(data.slice(0, 3));
        }
    },

    displaySpotlights: members => {
        const shuffled = members.sort(() => Math.random() - 0.5).slice(0, 3);
        document.getElementById('memberSpotlights').innerHTML = shuffled.map(member => `
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
    },

    displayBusinesses: businesses => {
        document.querySelector('.business-cards').innerHTML = businesses.map(business => `
            <div class="business-card">
                <img src="images/${business.image}" alt="${business.name}">
                <h3>${business.name}</h3>
                <p>${business.address}</p>
                <p>📞 ${business.phone}</p>
                <p>${business.membershipLevel} Member</p>
                <a href="${business.website}" target="_blank">Visit Website</a>
            </div>
        `).join('');
    }
};

// View Toggle Module
const ViewToggle = {
    init: () => {
        if(!document.getElementById('gridView')) return;
        
        document.getElementById('gridView').addEventListener('click', () => ViewToggle.toggle(false));
        document.getElementById('listView').addEventListener('click', () => ViewToggle.toggle(true));
    },

    toggle: isList => {
        document.querySelectorAll('.view-toggle button').forEach(btn => 
            btn.classList.remove('active'));
        document.getElementById(isList ? 'listView' : 'gridView').classList.add('active');
        document.querySelector('.business-cards').className = 
            `business-cards ${isList ? 'list-view' : 'grid-view'}`;
    }
};

// Form Module
const FormHandler = {
    init: () => {
        if(document.getElementById('joinForm')) FormHandler.setupJoinForm();
        if(document.querySelector('.thankyou-main')) FormHandler.handleThankYouPage();
    },

    setupJoinForm: () => {
        const form = document.getElementById('joinForm');
        form.querySelector('[name="timestamp"]').value = new Date().toISOString();

        form.addEventListener('submit', e => {
            const titleInput = form.querySelector('[name="title"]');
            if(titleInput.value && !/^[A-Za-zÀ-ÿ\- ]{7,}$/.test(titleInput.value)) {
                e.preventDefault();
                titleInput.setCustomValidity('Please enter at least 7 valid characters');
                titleInput.reportValidity();
            }
        });

        form.querySelector('[name="title"]').addEventListener('input', function() {
            this.setCustomValidity('');
        });
    },

    handleThankYouPage: () => {
        const params = new URLSearchParams(window.location.search);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

        document.getElementById('submission-name').textContent = 
            `${params.get('firstName')} ${params.get('lastName')}`;
        document.getElementById('submission-date').textContent = 
            new Date(params.get('timestamp')).toLocaleDateString('en-US', options);
        // Add other param handling as needed
    }
};

// Discover Module
const Discover = {
    init: () => {
        if(!document.getElementById('attractionsGrid')) return;
        Discover.loadAttractions();
        Discover.handleVisitMessage();
    },

    loadAttractions: async () => {
        const data = await Utils.fetchData('data/discover.json', 'Failed to load attractions');
        if(data) Discover.displayAttractions(data);
    },

    displayAttractions(attractions) {
        const grid = document.getElementById('attractionsGrid');
        grid.innerHTML = attractions.map(attraction => `
            <article class="attraction-card">
                <figure>
                    <img src="images/${attraction.image}" 
                         alt="${attraction.title}" 
                         loading="lazy">
                </figure>
                <div class="card-content">
                    <h2>${attraction.title}</h2>
                    <address>${attraction.address}</address>
                    <p>${attraction.description}</p>
                    <button aria-label="Learn more about ${attraction.title}">
                        Learn More
                    </button>
                </div>
            </article>
        `).join('');
    },

    handleVisitMessage: () => {
        const lastVisit = localStorage.getItem('lastVisit');
        const currentDate = Date.now();
        let message = "Welcome! Let us know if you have any questions.";

        if(lastVisit) {
            const daysBetween = Math.floor((currentDate - lastVisit) / 86400000);
            message = daysBetween === 0 ? "Back so soon! Awesome!" : 
                `You last visited ${daysBetween} day${daysBetween !== 1 ? 's' : ''} ago.`;
        }

        document.getElementById('visitMessage').textContent = message;
        localStorage.setItem('lastVisit', currentDate);
    }
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Common Initialization
    Navigation.init();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    // Page-Specific Initialization
    Weather.init();
    Members.init();
    ViewToggle.init();
    FormHandler.init();
    Discover.init();
});