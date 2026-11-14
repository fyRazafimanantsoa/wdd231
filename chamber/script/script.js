const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');
const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid-btn');
const listButton = document.querySelector('#list-btn');
const currentYear = new Date().getFullYear();

document.getElementById("last-modified").innerHTML = document.lastModified;
document.getElementById("current-year").textContent = currentYear;

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

gridButton.addEventListener('click', () => {
  directoryContainer.classList.add('grid-view');
  directoryContainer.classList.remove('list-view');
  gridButton.classList.add('active');
  listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
  directoryContainer.classList.add('list-view');
  directoryContainer.classList.remove('grid-view');
  listButton.classList.add('active');
  gridButton.classList.remove('active');
});

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.log(error);
  }
}

function displayMembers(members) {
  directoryContainer.innerHTML = '';

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const memberDiv = document.createElement('article');
    
    memberDiv.classList.add('business-card');

    memberDiv.innerHTML = `
      <div class="card-header">
        <h3>${member.name}</h3>
        <p class="tagline">${member.tagline}</p>
      </div>
      <div class="card-body">
        <div class="card-image">
          <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        </div>
        <div class="card-info">
          <p><strong>EMAIL:</strong> ${member.email}</p>
          <p><strong>PHONE:</strong> ${member.phone}</p>
          <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        </div>
      </div>
      <div class="card-description">
        <p>${member.description}</p>
      </div>
    `;

    directoryContainer.appendChild(memberDiv);
  }
}

getMembers();