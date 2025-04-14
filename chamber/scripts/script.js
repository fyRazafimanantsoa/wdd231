// Utility Functions
const Utils = {
    capitalize: str => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),

    handleError: (elementId, message) => {
        console.error(message);
        if (elementId) {
            document.getElementById(elementId).innerHTML = `<p class="error">${message}</p>`;
        }
    },

    fetchData: async (url, errorMessage = 'Failed to fetch data') => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(errorMessage);
            return await response.json();
        } catch (error) {
            Utils.handleError(null, error.message);
            return null;
        }
    }
};

// Navigation
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
Navigation.init();

// Weather
const Weather = {
    LAT: -18.9178,
    LON: 47.4724,
    API_KEY: 'ae319551d33a1c811524f76d19861a06',

    init: async () => {
        if (!document.getElementById('weather-container')) return;
        try {
            const [current, forecast] = await Promise.all([
                Weather.fetchWeather('weather'),
                Weather.fetchWeather('forecast')
            ]);
            if (current && forecast) Weather.updateDisplay(current, forecast);
        } catch {
            Utils.handleError('weather-container', 'Weather data unavailable');
        }
    },

    fetchWeather: async (type) => {
        const url = `https://api.openweathermap.org/data/2.5/${type}?lat=${Weather.LAT}&lon=${Weather.LON}&units=metric&appid=${Weather.API_KEY}`;
        return Utils.fetchData(url, 'Failed to load weather data');
    },

    updateDisplay: (current, forecast) => {
        document.getElementById('currentTemp').textContent = `${Math.round(current.main.temp)}°C`;
        document.getElementById('weatherDesc').textContent = current.weather.map(w => Utils.capitalize(w.description)).join(', ');
        document.getElementById('humidity').textContent = `Humidity: ${current.main.humidity}%`;

        const icon = document.getElementById('weather-icon');
        icon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
        icon.alt = current.weather[0].description;

        document.getElementById('threeDayForecast').innerHTML = forecast.list
            .filter(item => item.dt_txt.includes('12:00:00'))
            .slice(0, 3)
            .map(day => `
                <div class="forecast-day">
                    <h4>${new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}</h4>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}" loading="lazy">
                    <p>${Math.round(day.main.temp_max)}°/${Math.round(day.main.temp_min)}°</p>
                    <p>${Utils.capitalize(day.weather[0].description)}</p>
                </div>`).join('');
    }
};

// Members
const Members = {
    init: async () => {
        const spotlights = document.getElementById('memberSpotlights');
        const cards = document.querySelector('.business-cards');
        if (!spotlights && !cards) return;

        const data = await Utils.fetchData('data/members.json');
        if (!data) return;

        if (spotlights) Members.displaySpotlights(data.filter(m => m.membershipLevel >= 2));
        if (cards) Members.displayBusinesses(data.slice(0, 3));
    },

    displaySpotlights: members => {
        const shuffled = [...members].sort(() => Math.random() - 0.5).slice(0, 3);
        document.getElementById('memberSpotlights').innerHTML = shuffled.map(member => `
            <div class="spotlight-card">
                <img src="images/${member.image.replace(' ', '-')}" alt="${member.name}" loading="lazy">
                <div class="spotlight-content">
                    <h3>${member.name}</h3>
                    <p class="address">${member.address}</p>
                    <p class="phone">📞 ${member.phone}</p>
                    <p class="membership ${member.membershipLevel === 3 ? 'gold' : 'silver'}">${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</p>
                    <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
                </div>
            </div>`).join('');
    },

    displayBusinesses: businesses => {
        document.querySelector('.business-cards').innerHTML = businesses.map(b => `
            <div class="business-card">
                <img src="images/${b.image}" alt="${b.name}">
                <h3>${b.name}</h3>
                <p>${b.address}</p>
                <p>📞 ${b.phone}</p>
                <p>${b.membershipLevel} Member</p>
                <a href="${b.website}" target="_blank">Visit Website</a>
            </div>`).join('');
    }
};

// View Toggle
const ViewToggle = {
    init: () => {
        const gridBtn = document.getElementById('gridView');
        const listBtn = document.getElementById('listView');
        if (!gridBtn || !listBtn) return;

        gridBtn.addEventListener('click', () => ViewToggle.toggle(false));
        listBtn.addEventListener('click', () => ViewToggle.toggle(true));
    },

    toggle: isList => {
        document.querySelectorAll('.view-toggle button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(isList ? 'listView' : 'gridView').classList.add('active');
        document.querySelector('.business-cards').className = `business-cards ${isList ? 'list-view' : 'grid-view'}`;
    }
};

// Form Handling
const FormHandler = {
    init: () => {
        const form = document.getElementById('joinForm');
        if (form) FormHandler.setupJoinForm(form);

        if (document.querySelector('.thankyou-main')) FormHandler.handleThankYouPage();
    },

    setupJoinForm: form => {
        form.querySelector('[name="timestamp"]').value = new Date().toISOString();
        form.addEventListener('submit', e => {
            const titleInput = form.querySelector('[name="title"]');
            if (titleInput.value && !/^[A-Za-zÀ-ÿ\- ]{7,}$/.test(titleInput.value)) {
                e.preventDefault();
                titleInput.setCustomValidity('Please enter at least 7 valid characters');
                titleInput.reportValidity();
            }
        });
        form.querySelector('[name="title"]').addEventListener('input', function () {
            this.setCustomValidity('');
        });
    },

    handleThankYouPage: () => {
        const params = new URLSearchParams(window.location.search);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

        document.getElementById('submission-name').textContent = `${params.get('firstName')} ${params.get('lastName')}`;
        document.getElementById('submission-date').textContent = new Date(params.get('timestamp')).toLocaleDateString('en-US', options);
    }
};

// Discover
const Discover = {
    init: () => {
        if (!document.getElementById('attractionsGrid')) return;
        Discover.loadAttractions();
        Discover.handleVisitMessage();
        Discover.bindDialogClose();
    },

    loadAttractions: async () => {
        try {
            const data = await Utils.fetchData('data/discover.json');
            if (data) Discover.displayAttractions(data);
        } catch (error) {
            console.error(error.message);
        }
    },

    displayAttractions: attractions => {
        const grid = document.getElementById('attractionsGrid');
        grid.innerHTML = attractions.map((a, index) => `
            <article class="attraction-card">
                <figure>
                    <img src="images/${a.image}" alt="${a.title}" loading="lazy">
                </figure>
                <div class="card-content">
                    <h2>${a.title}</h2>
                    <address>${a.address}</address>
                    <p>${a.description}</p>
                    <button aria-label="Learn more about ${a.title}" data-index="${index}">Learn More</button>
                </div>
            </article>`).join('');

        document.querySelectorAll('.attraction-card button').forEach(button => {
            button.addEventListener('click', e => Discover.showDialog(attractions[e.target.dataset.index]));
        });
    },

    showDialog: attraction => {
        const dialog = document.getElementById('attraction-dialog');
        document.getElementById('dialogTitle').textContent = attraction.title;
        document.getElementById('dialogAddress').textContent = attraction.address;
        document.getElementById('dialogInfos').textContent = attraction.infos;
        dialog.showModal();
    },

    bindDialogClose: () => {
        document.getElementById('dialog-close').addEventListener('click', () => {
            document.getElementById('attraction-dialog').close();
        });
    },

    handleVisitMessage: () => {
        const lastVisit = localStorage.getItem('lastVisit');
        const now = Date.now();
        const daysSince = lastVisit ? Math.floor((now - lastVisit) / 86400000) : null;
        const message = !lastVisit ? "Welcome! Let us know if you have any questions." :
            daysSince === 0 ? "Back so soon! Awesome!" : `You last visited ${daysSince} day${daysSince !== 1 ? 's' : ''} ago.`;

        document.getElementById('visitMessage').textContent = message;
        localStorage.setItem('lastVisit', now);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Discover.init();
    Members.init();
    Weather.init();
    ViewToggle.init();
    FormHandler.init();
});
