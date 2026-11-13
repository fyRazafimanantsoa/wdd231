const navButton = document.querySelector('#nav-button');
const navBar = document.querySelector("#nav-bar");
const currentYear = new Date().getFullYear();
const allcourse = document.querySelector('#allCourse');
const wddCourse = document.querySelector('#wddCourse');
const cseCourse = document.querySelector('#cseCourse');
const courseList = document.querySelector('#courseList');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navBar.classList.toggle('show');
});

document.getElementById("lastModified").innerHTML = document.lastModified;
document.getElementById("current-year").textContent = currentYear;

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'C#'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
]

function displayCourse(courses) {

  courseList.innerHTML = '';

  /*loop through the courses array*/
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    /*create a new div element for each course*/
    const courseDiv = document.createElement('div');

    courseDiv.classList = "course-card"

    /*Check if the course is completed*/
    if (course.completed === true) {
      courseDiv.style.backgroundColor = "#00af14";
    } else {
      courseDiv.style.backgroundColor = "#62606048";
    }

    // add content to the course div
    courseDiv.innerHTML = `
      <div> ${course.subject} ${course.number} </div>
    `;

    // add to the page 
    courseList.appendChild(courseDiv);
  }


}

wddCourse.addEventListener('click', () => {
  let wddList = [];

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].subject === 'WDD') {
      wddList.push(courses[i]);
    }
  }
  displayCourse(wddList);
  totalCredits(wddList);
});

cseCourse.addEventListener('click', () => {
  let cseList = [];

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].subject === 'CSE') {
      cseList.push(courses[i]);
    }
  }
  displayCourse(cseList);
  totalCredits(cseList);
});

allcourse.addEventListener('click', () => {
  displayCourse(courses);
  totalCredits(courses);
});


function totalCredits(courses) {
  let total = 0;

  for (let i = 0; i < courses.length; i++) {
    total = total + courses[i].credits;
  }

  let totalDisplay = document.getElementById("totalCredit");
  totalDisplay.textContent = total;
}

displayCourse(courses);
totalCredits(courses);