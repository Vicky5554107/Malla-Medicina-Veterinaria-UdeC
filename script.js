let approved = [];

// Asignar área según código o nombre
function getAreaClass(name) {
  if (name.includes("🫀") || name.includes("Fisiología")) return "area-anatomia";
  if (name.includes("🔬") || name.includes("Microbiología") || name.includes("Parasitología")) return "area-parasitologia";
  if (name.includes("💉") || name.includes("Clínica") || name.includes("Cirugía") || name.includes("Anestesiología")) return "area-clinica";
  if (name.includes("🐄") || name.includes("Producción") || name.includes("Nutrición")) return "area-produccion";
  if (name.includes("🛡️") || name.includes("Salud Pública")) return "area-salud";
  if (name.includes("🐣") || name.includes("Reproducción")) return "area-reproduccion";
  if (name.includes("🧳") || name.includes("Trabajo de Titulación") || name.includes("Internado")) return "area-final";
  return "";
}

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
      const isApproved = approved.includes(course.code);

      // Área académica por ícono
      const areaClass = getAreaClass(course.name);
      btn.classList.add(areaClass);

      // Estado visual
      if (isApproved) {
        btn.classList.add("approved");
      } else {
        btn.classList.add(isUnlocked ? "available" : "locked");
      }

      // Tooltip informativo
      const prereqText = course.prerequisites.length
        ? `Prerrequisitos: ${course.prerequisites.join(", ")}`
        : "Sin prerrequisitos";
      btn.title = `${course.name}\nCréditos: ${course.credits}\n${prereqText}`;

      // Texto del botón
      btn.textContent = course.name;

      // Click para aprobar
      btn.onclick = () => {
        if (isUnlocked && !isApproved) {
          approved.push(course.code);
          renderCourses(data);
        }
      };

      semDiv.appendChild(btn);
    });

    container.appendChild(semDiv);
  });
}

// Cargar datos
fetch("data.json")
  .then(res => res.json())
  .then(data => renderCourses(data));
