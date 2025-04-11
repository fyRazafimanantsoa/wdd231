const lessons = {
  html: [
    {
      title: "HTML Structure",
      content: "Learn basic HTML document structure",
      example: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`
    },
    {
      title: "Headings & Paragraphs",
      content: "Use heading tags and paragraph elements",
      example: `<h1>Main Title</h1>
<h2>Subheading</h2>
<p>This is a paragraph of text.</p>`
    },
    {
      title: "Links & Anchors",
      content: "Create hyperlinks between pages",
      example: `<a href="https://example.com">Visit Example</a>
<a href="#section2">Jump to Section 2</a>`
    },
    {
      title: "Images",
      content: "Embed images with alt text",
      example: `<img src="logo.png" alt="Company Logo" width="200">
<img src="photo.jpg" alt="Scenic view" loading="lazy">`
    },
    {
      title: "Lists",
      content: "Create ordered and unordered lists",
      example: `<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>`
    },
    {
      title: "Forms",
      content: "Build interactive forms",
      example: `<form action="/submit">
  <input type="text" name="username" required>
  <input type="password" name="pwd">
  <button type="submit">Send</button>
</form>`
    },
    {
      title: "Tables",
      content: "Organize data in tabular format",
      example: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>25</td>
  </tr>
</table>`
    },
    {
      title: "Semantic Elements",
      content: "Use modern semantic tags",
      example: `<header>Page Header</header>
<nav>Navigation Links</nav>
<main>
  <article>Main Content</article>
</main>
<footer>Copyright Info</footer>`
    },
    {
      title: "Meta Tags",
      content: "Configure page metadata",
      example: `<meta charset="UTF-8">
<meta name="description" content="Free Web tutorials">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`
    },
    {
      title: "Multimedia",
      content: "Embed video and audio",
      example: `<video controls width="250">
  <source src="movie.mp4" type="video/mp4">
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>`
    }
  ],
  css: [
    {
      title: "CSS Selectors",
      content: "Understand basic CSS selection methods",
      example: `/* Element selector */
h1 {
  color: blue;
}

/* Class selector */
.my-class {
  padding: 1rem;
}

/* ID selector */
#special {
  font-weight: bold;
}`
    },
    {
      title: "Box Model",
      content: "Understand margin, border, and padding",
      example: `.box {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  margin: 10px;
}`
    },
    {
      title: "Flexbox Layout",
      content: "Create flexible layouts",
      example: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`
    },
    {
      title: "Grid Layout",
      content: "Build two-dimensional layouts",
      example: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`
    },
    {
      title: "Responsive Design",
      content: "Create mobile-friendly layouts",
      example: `@media (max-width: 600px) {
  .menu {
    flex-direction: column;
  }
}`
    },
    {
      title: "Transitions",
      content: "Animate property changes",
      example: `.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: scale(1.1);
}`
    },
    {
      title: "Animations",
      content: "Create keyframe animations",
      example: `@keyframes slide {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-in {
  animation: slide 0.5s ease;
}`
    },
    {
      title: "Positioning",
      content: "Control element positioning",
      example: `.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

.fixed {
  position: fixed;
  bottom: 20px;
}`
    },
    {
      title: "Pseudo-classes",
      content: "Style element states",
      example: `a:hover {
  color: red;
}

li:nth-child(odd) {
  background: #eee;
}`
    },
    {
      title: "CSS Variables",
      content: "Use custom properties",
      example: `:root {
  --main-color: #06c;
}

.element {
  color: var(--main-color);
}`
    }
  ],
  js: [
    {
      title: "Variables",
      content: "Learn variable declaration with let/const",
      example: `// Number variable
let age = 25;

// String variable
const name = "Alice";

// Boolean variable
let isStudent = true;`
    },
    {
      title: "Data Types",
      content: "Understand JavaScript types",
      example: `// Primitive types
typeof "Hello" // string
typeof 42      // number
typeof true    // boolean
typeof null    // object`

    },
    {
      title: "Functions",
      content: "Create reusable code blocks",
      example: `function greet(name) {
  return \`Hello \${name}!\`;
}

const square = x => x * x;`
    },
    {
      title: "Conditionals",
      content: "Make decisions in code",
      example: `if (temperature > 30) {
  console.log("Hot day!");
} else if (temperature > 20) {
  console.log("Pleasant day");
} else {
  console.log("Cold day");
}`
    },
    {
      title: "Loops",
      content: "Repeat actions efficiently",
      example: `// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let x = 3;
while (x > 0) {
  console.log(x);
  x--;
}`
    },
    {
      title: "Arrays",
      content: "Work with ordered collections",
      example: `let fruits = ["Apple", "Banana"];
fruits.push("Orange");
fruits.forEach(fruit => console.log(fruit));`
    },
    {
      title: "Objects",
      content: "Store key-value pairs",
      example: `const user = {
  name: "Alice",
  age: 25,
  isAdmin: false
};

console.log(user.name);`
    },
    {
      title: "DOM Manipulation",
      content: "Interact with page elements",
      example: `const btn = document.querySelector("#myButton");
btn.addEventListener("click", () => {
  document.body.style.backgroundColor = "blue";
});`
    },
    {
      title: "Events",
      content: "Handle user interactions",
      example: `document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});`
    },
    {
      title: "Fetch API",
      content: "Make HTTP requests",
      example: `fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`
    }
  ]
};

function createLessonCard(lesson) {
  const card = document.createElement('div');
  card.className = 'lesson-card';
  card.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>${lesson.content}</p>
    <pre>${lesson.example}</pre>
    <button class="try-button">Try Example</button>
  `;
  return card;
}

function initializeLessons() {
  const containers = {
    html: document.getElementById('htmlLessons'),
    css: document.getElementById('cssLessons'),
    js: document.getElementById('jsLessons')
  };

  for (const lang in lessons) {
    lessons[lang].forEach(lesson => {
      containers[lang].appendChild(createLessonCard(lesson));
    });
  }
}

// Code execution functions
async function executeHTML() {
  const code = document.getElementById('htmlEditor').value;
  const preview = document.getElementById('htmlPreview');
  try {
    preview.srcdoc = code;
  } catch (error) {
    console.error('HTML Error:', error);
  }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  initializeLessons();
  document.getElementById('runHTML').addEventListener('click', executeHTML);
});

// Get current year
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Get last modified date
const lastModified = document.lastModified;
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modified: ${lastModified}`;

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menu');
    const nav = document.querySelector('.menu');

    menu.addEventListener('click', function() {
        nav.classList.toggle('show');
        menu.textContent = nav.classList.contains('show') ? '✖' : '☰';
    });
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

  const editors = {
  html: {
    editor: document.getElementById('codeEditor'),
    preview: document.getElementById('preview'),
    runButton: document.getElementById('runHTML')
  },
  js: {
    editor: document.getElementById('jsEditor'),
    output: document.getElementById('jsOutput'),
    runButton: document.getElementById('runJS')
  }
};

const runHTML = async () => {
  const code = editors.html.editor.value;
  const blob = new Blob([code], { type: 'text/html' });
  editors.html.preview.src = URL.createObjectURL(blob);
};

const runJS = async () => {
  try {
    const code = editors.js.editor.value;
    const result = await new Function(code)();
    editors.js.output.textContent = result || 'Code executed successfully';
  } catch (error) {
    editors.js.output.textContent = `Error: ${error.message}`;
  }
};

document.getElementById('resetCode').addEventListener('click', () => {
  editors.html.editor.value = '';
  editors.js.editor.value = '';
  editors.html.preview.srcdoc = '';
  editors.js.output.textContent = '';
});

// Initialize default code
window.addEventListener('DOMContentLoaded', () => {
  editors.html.editor.value = `<!DOCTYPE html>
<html>
<head>
  <title>Sandbox</title>
  <style>
    body { padding: 20px; }
  </style>
</head>
<body>
  <h1>Start Coding!</h1>
</body>
</html>`;
  
  editors.js.editor.value = `// JavaScript playground
console.log("Hello Code Lab!");
document.body.style.backgroundColor = '#f0f0f0';`;
});

export { runHTML, runJS };