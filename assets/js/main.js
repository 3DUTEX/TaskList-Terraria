const taskName = document.querySelector(".input-task");
const btnAdd = document.querySelector(".btn-addTask");
const tasksContainer = document.querySelector(".tasks-container");

//Função IIFE
(function getList() {
  try {
    const taskList = localStorage.getItem("tasks");
    const taskArray = JSON.parse(taskList);

    taskArray.map((task) => {
      const taskMaked = createTask(task.taskName, task.status);
      tasksContainer.appendChild(taskMaked);
    });
  } catch (e) {
    console.log("Primeira vez executando");
  }

  organizationList();
})();

function saveList() {
  let listaArray = [];
  let taskList = tasksContainer.querySelectorAll("li");

  for (task of taskList) {
    let status = false;
    if (task.classList.contains("concluido")) {
      status = true;
    }
    const taskObj = {
      taskName: task.innerText,
      status: status,
    };
    listaArray.push(taskObj);
  }

  const arrayString = JSON.stringify(listaArray);
  localStorage.setItem("tasks", arrayString);
}

function createTask(nome, status = false) {
  const li = document.createElement("li");
  li.innerText = nome;

  li.classList.add("task-item");
  if (status) {
    li.classList.add("concluido");
  } else {
    li.classList.add("pendente");
  }

  const img = document.createElement("img");
  img.src = "./assets/images/lixeira.svg";

  li.appendChild(img);

  img.addEventListener("click", () => {
    img.parentElement.remove();
    saveList();
  });

  li.addEventListener("click", () => {
    if (li.classList.contains("pendente")) {
      li.classList.replace("pendente", "concluido");
    } else {
      li.classList.replace("concluido", "pendente");
    }
    organizationList();
    saveList();
  });

  return li;
}

btnAdd.addEventListener("click", () => {
  const task = createTask(taskName.value);
  tasksContainer.appendChild(task);

  taskName.value = "";
  saveList();
  organizationList();
});

function organizationList() {
  let taskList = tasksContainer.querySelectorAll("li");
  let newTaskList = [];

  for (task of taskList) {
    let status = false;
    if (task.classList.contains("concluido")) {
      status = true;
    }
    const taskObj = {
      taskName: task.innerText,
      status: status,
    };

    if (task.classList.contains("pendente")) {
      newTaskList.unshift(taskObj);
    } else {
      newTaskList.push(taskObj);
    }
  }

  tasksContainer.innerHTML = "";
  for (task of newTaskList) {
    const taskMaked = createTask(task.taskName, task.status);
    tasksContainer.appendChild(taskMaked);
  }
}
