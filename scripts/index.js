const dayName = document.querySelector(".day_name");
const day = document.querySelector(".day");

const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayNameText = days[dayOfWeek];
const currentDay = currentDate.toLocaleDateString();

dayName.textContent = dayNameText;
day.textContent = currentDay;
// Description 

const form = document.querySelector(".newTaskForm");
const description = document.querySelector(".description");
const datetime = document.querySelector(".datetime");
const clear = document.querySelector(".btn_clear");
const allTasksView = document.querySelector(".all_tasks");
const searchInput = document.querySelector(".search");

let all_tasks = JSON.parse(localStorage.getItem("all_tasks")) || [];

function renderAllTasks(listOfTasks) {
  allTasksView.innerHTML = ''; // Очистить контейнер перед рендерингом
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
  renderAllTasks(all_tasks);
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
  cardDiv.classList.add("cardDiv")
  descriptionCard.textContent = task.taskDescription;
  datetimeCard.textContent = task.taskDatetime;

  cardDiv.append(datetimeCard, descriptionCard, checkbox);
  allTasksView.append(cardDiv);

  // Добавление обработчика события для удаления div при нажатии клавиши delete
  cardDiv.addEventListener("keydown", (event) => {
    if (event.key === "Delete") {
      cardDiv.remove();
      // Здесь можно добавить логику удаления задачи из массива `all_tasks` и обновление localStorage
    }
  });
}

function createTask(description, datetime) {
  return {
    id: `todo_${datetime + all_tasks.length + description}`,
    taskDescription: description,
    taskDatetime: datetime,
    checked: false,
  };
}

// Очистка полей формы
clear.addEventListener("click", (event) => {
  event.preventDefault();
  datetime.value = "";
  description.value = "";
});

// Поиск задач по описанию
searchInput.addEventListener("input", (event) => {
  const searchValue = event.target.value.toLowerCase();
  const filteredTasks = all_tasks.filter((task) => {
    return task.taskDescription.toLowerCase().includes(searchValue);
  });
  renderAllTasks(filteredTasks);
});