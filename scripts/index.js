const dayName = document.querySelector(".day_name");
const day = document.querySelector(".day");

const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayNameText = days[dayOfWeek];
const currentDay = currentDate.toLocaleDateString();

dayName.textContent = dayNameText;
day.textContent = currentDay;

//=====================================Description=========================================//

const const form = document.querySelector(".newTaskForm");
const description = document.querySelector(".description");
const datetime = document.querySelector(".date");
const clear = document.querySelector(".btn_clear");
const allTasksView = document.querySelector(".all_tasks");

let all_tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];

function renderAllTasks(listOfTasks) {
  listOfTasks.forEach((task) => {
    createTaskCard(task);
  });
}

renderAllTasks(all_tasks);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const newTask = createTask(description.value, datetime.value);
  all_tasks.push(newTask);
  localStorage.setItem("all_tasks", JSON.stringify(all_tasks));
  createTaskCard(newTask);
  form.reset();
});

function createTaskCard(task) {
  const cardDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const descriptionCard = document.createElement("p");
  const datetimeCard = document.createElement("p");

  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("change", (event) => {
    descriptionCard.style.opacity = event.target.checked ? 0.5 : 1;
    descriptionCard.style.textDecoration = event.target.checked ? "line-through" : "none";
  });

  descriptionCard.textContent = task.taskDescription;
  datetimeCard.textContent = task.taskDatetime;

  // Debugging lines to ensure values are correct
  console.log("Description: ", descriptionCard.textContent);
  console.log("Datetime: ", datetimeCard.textContent);

  cardDiv.append(datetimeCard, descriptionCard, checkbox);
  allTasksView.append(cardDiv);
}

function createTask(description, datetime) {
  return {
    id: `todo_${datetime + all_tasks.length + description}`,
    taskDescription: description,
    taskDatetime: datetime,
    checked: false,
  };
}

datetime.addEventListener("focus", () => {
  datetime.setAttribute("type", "datetime-local");
});

datetime.addEventListener("blur", () => {
  datetime.setAttribute("type", "text");
});

console.log(datetime.value); 