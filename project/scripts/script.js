// script.js

// Update footer with current year and last modified date
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentyear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("active");
    hamburger.textContent = navList.classList.contains("active") ? "✕" : "☰";
  });

  // -------------------------
  // Community Chat Functionality
  // -------------------------
  const communityForm = document.getElementById("communityForm");
  const chatContainer = document.getElementById("chatContainer");

  let chats = JSON.parse(localStorage.getItem("communityChats")) || [];
  function displayChats() {
    chatContainer.innerHTML = chats
      .map(
        (chat) => `<div class="story">
          <h3>${chat.username}</h3>
          <p>${chat.journey}</p>
          <small>${chat.timestamp}</small>
        </div>`
      )
      .join("");
  }
  displayChats();

  if (communityForm) {
    communityForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value.trim();
      const journey = document.getElementById("journey").value.trim();
      if (username && journey) {
        const newChat = {
          username,
          journey,
          timestamp: new Date().toLocaleString(),
        };
        chats.push(newChat);
        localStorage.setItem("communityChats", JSON.stringify(chats));
        displayChats();
        communityForm.reset();
      }
    });
  }

  // -------------------------
  // Modal Dialog for Top Coding Websites
  // -------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("openModal");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModal");

    if (openModalBtn) {
      openModalBtn.addEventListener("click", () => {
        modal.style.display = "block"; // Show the modal when the button is clicked
        loadWebsiteData(); // Assuming this function dynamically loads the website data
      });
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal when the close button is clicked
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"; // Close the modal if the user clicks outside the modal content
      }
    });

    // Function to load website data into modal
    async function loadWebsiteData() {
      try {
        const response = await fetch("data/data.json");
        const websites = await response.json();
        websiteListContainer.innerHTML = websites
          .map(
            (site) => `
            <div class="website-item">
              <img src="${site.img}" alt="${site.name} logo" loading="lazy" width="100" height="100" class="website-img">
              <div class="website-info">
                <h3>
                  <a href="${site.url}" target="_blank" rel="noopener noreferrer">
                    ${site.name}
                  </a>
                </h3>
                <p><strong>Speciality:</strong> ${site.speciality}</p>
                <p><strong>Monthly Learners:</strong> ${site.monthlyLearners}</p>
              </div>
            </div>
          `)
          .join("");
      } catch (error) {
        websiteListContainer.innerHTML = "<p>Error loading website data.</p>";
        console.error("Error fetching websites:", error);
      }
    }
  });


  if (window.location.pathname.endsWith('community-submit.html')) {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('fullname').textContent = params.get('fullname') || '—';
    document.getElementById('email').textContent = params.get('email') || '—';
    document.getElementById('language').textContent = params.get('language') || '—';
    document.getElementById('experience').textContent = params.get('experience') || '—';
    document.getElementById('reason').textContent = params.get('reason') || '—';
    document.getElementById('goals').textContent = params.get('goals') || '—';
    document.getElementById('newsletter').textContent = params.get('newsletter') ? 'Yes' : 'No';
  }
}

  // -------------------------
  // Interactive Lessons Section (Tabbed Interface)
  // -------------------------
/*const lessonTabs = document.querySelectorAll('.lesson-tab');
const lessonContentContainer = document.getElementById('lessonContent');

if (lessonTabs.length > 0) {
  fetch('data/lessons.json')
    .then(response => response.json())
    .then(lessons => {
      // Default: show HTML lessons
      showLessons('html', lessons);
      lessonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          lessonTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          showLessons(tab.dataset.category, lessons);
        });
      });
    })
    .catch(err => {
      lessonContentContainer.innerHTML = '<p>Error loading lessons.</p>';
      console.error('Error fetching lessons:', err);
    });

  function showLessons(category, lessons) {
    const lessonList = lessons[category]
      .map(
        lesson => `
        <div class="lesson-item">
          <h3>${lesson.title}</h3>
          <p>${lesson.description}</p>
          <p><strong>Duration:</strong> ${lesson.duration}</p>
        </div>
      `
      )
      .join('');
    lessonContentContainer.innerHTML = lessonList;
  }
}
});*/
