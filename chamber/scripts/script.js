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