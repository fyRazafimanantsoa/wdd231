// Get current year
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Get last modified date
const lastModified = document.lastModified;
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modified: ${lastModified}`;


document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  
  hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      hamburger.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
  });
  
  // Update copyright year
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  
  // Update last modified date
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});

document.getElementById('communityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const journey = document.getElementById('journey').value;
    
    if(username && journey) {
      // Create a new story element
      const storyDiv = document.createElement('div');
      storyDiv.classList.add('story');
      storyDiv.innerHTML = '<h3>' + username + '</h3><hr><p>' + journey + '</p>';
      
      // Append to stories section
      document.getElementById('stories').appendChild(storyDiv);
      
      // Reset the form
      this.reset();
    }
  });