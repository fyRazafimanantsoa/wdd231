
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
});

const toggleButton = document.getElementById('viewToggle');
toggleButton.addEventListener('click', () => {
  document.querySelector('.business-cards').classList.toggle('list-view');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;


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
        <img src="images/${business.image}" alt="${business.name}">
        <h3>${business.name}</h3>
        <p>${business.address}</p>
        <p>📞 ${business.phone}</p>
        <p>${business.membershipLevel} Member</p>
        <a href="${business.website}" target="_blank">Visit Website</a>
     </div>
  `).join('') : '<p>No businesses found</p>';
}

loadBusinesses();

