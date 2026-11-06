
const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector('#nav-bar');

const currentYear = new Date().getFullYear();

const allCourse = document.querySelector('#allCourse');
const wddCourse = document.querySelector('#wddCourse');
const cseCourse = document.querySelector('#cseCourse');

const courseList = document.querySelector('#courseList');


// Navigation button
navButton.addEventListener('click', () => {

    navButton.classList.toggle('show');
    navBar.classList.toggle('show');

    const isExpanded = navButton.classList.contains('show');

    navButton.setAttribute('aria-expanded', isExpanded);

});


// Footer information
document.getElementById('lastModified').textContent = document.lastModified;

document.getElementById('currentYear').textContent = currentYear;


// Course array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to programming concepts including variables, decisions, calculations, loops, arrays, and input/output.',
        technology: ['Python'],
        completed: true
    },

    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and careers in website design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },

    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to research, write, call, debug, and test functions to solve programming problems.',
        technology: ['Python'],
        completed: true
    },

    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, encapsulation, inheritance, and polymorphism.',
        technology: ['C#'],
        completed: true
    },

    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to create dynamic websites using JavaScript and responsive web development techniques.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },

    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students focus on user experience, accessibility, performance optimization, and API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];


// Display courses
function displayCourse(courseArray) {

    courseList.innerHTML = '';

    courseArray.forEach(course => {

        const courseDiv = document.createElement('div');

        courseDiv.classList.add('course-card');

        // Check course completion
        if (course.completed) {
            courseDiv.classList.add('completed');
        } else {
            courseDiv.classList.add('incomplete');
        }

        // Display course information
        courseDiv.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;

        courseList.appendChild(courseDiv);

    });

}


// Calculate total credits
function totalCredits(courseArray) {

    let total = 0;

    courseArray.forEach(course => {
        total += course.credits;
    });

    document.getElementById('totalCredit').textContent = total;

}


// Filter courses
function filterCourses(subject) {

    let filteredCourses;

    if (subject === 'ALL') {

        filteredCourses = courses;

    } else {

        filteredCourses = courses.filter(course => {
            return course.subject === subject;
        });

    }

    displayCourse(filteredCourses);

    totalCredits(filteredCourses);

}


// Button events
allCourse.addEventListener('click', () => {
    filterCourses('ALL');
});

wddCourse.addEventListener('click', () => {
    filterCourses('WDD');
});

cseCourse.addEventListener('click', () => {
    filterCourses('CSE');
});


// Initial display
filterCourses('ALL');
