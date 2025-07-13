let approved = [];

function renderCourses(data) {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  data.semesters.forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.innerHTML = `<h3>${sem.name}</h3>`;

    sem.courses.forEach(course => {
      const btn = document.createElement("button");
      btn.className = "course";

      const isUnlocked = course.prerequisites.every(p => approved.includes(p));
      if (approved.includes(course.code)) {
        btn.classList.add("approved");
      } else {
        btn.classList.add(isUnlocked ? "available" : "locked");
      }

      btn.textContent = `${course.name}`;

      btn.onclick = () => {
        if (isUnlocked && !approved.includes(course.code)) {
          approved.push(course.code);
          renderCourses(data);
        }
      };

      semDiv.appendChild(btn);
    });

    container.appendChild(semDiv);
  });
}

fetch("data.json")
  .then(res => res.json())
  .then(data => renderCourses(data));
