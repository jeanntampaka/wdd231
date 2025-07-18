
const courses = [
  { code: 'WDD130', name: 'Web Fundamentals', credits: 3, type: 'WDD', completed: true },
  { code: 'WDD131', name: 'Dynamic Web Fundamentals', credits: 3, type: 'WDD', completed: true },
  { code: 'WDD231', name: 'Front-end Web Development I', credits: 3, type: 'WDD', completed: false },
  { code: 'CSE121b', name: 'JavaScript Language', credits: 3, type: 'CSE', completed: true },
  { code: 'CSE110', name: 'Intro to Programming', credits: 2, type: 'CSE', completed: true }
];

const container = document.getElementById('courseContainer');
const totalCredits = document.getElementById('totalCredits');

function displayCourses(filtered) {
  container.innerHTML = '';
  let total = 0;

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('completed');
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p>Status: ${course.completed ? 'Completed' : 'In Progress'}</p>
    `;
    total += course.credits;
    container.appendChild(card);
  });

  totalCredits.textContent = total;
}

document.getElementById('allBtn').addEventListener('click', () => {
  displayCourses(courses);
});

document.getElementById('wddBtn').addEventListener('click', () => {
  displayCourses(courses.filter(c => c.type === 'WDD'));
});

document.getElementById('cseBtn').addEventListener('click', () => {
  displayCourses(courses.filter(c => c.type === 'CSE'));
});

displayCourses(courses);
