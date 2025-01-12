// Get current year
const currentYearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Get last modified date
const lastModified = document.lastModified;
const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modified: ${lastModified}`;

// Course list array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming.',
        completed: false
    }
];

// Render courses dynamically
function renderCourses(filter = null) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";

    let filteredCourses = filter ? courses.filter(filter) : courses;

    let totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("total-credits").textContent = totalCredits;

    filteredCourses.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.className = "course-item";
        courseDiv.innerHTML = `<h3>${course.title} (${course.credits} credits)</h3><p>${course.description}</p>`;
        courseList.appendChild(courseDiv);
    });
}

// Filter buttons
document.getElementById("show-all").addEventListener("click", () => renderCourses());
document.getElementById("show-wdd").addEventListener("click", () => renderCourses((course) => course.subject === "WDD"));
document.getElementById("show-cse").addEventListener("click", () => renderCourses((course) => course.subject === "CSE"));

// Initial render
renderCourses();