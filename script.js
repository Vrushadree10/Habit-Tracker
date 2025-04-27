const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");
const userSpan = document.getElementById("user");

function login() {
  const username = document.getElementById("username").value.trim();
  if (username) {
    localStorage.setItem("habitUser", username);
    showApp();
  }
}

function logout() {
  localStorage.removeItem("habitUser");
  localStorage.removeItem("habitData");
  location.reload();
}

function showApp() {
  const user = localStorage.getItem("habitUser");
  if (user) {
    loginScreen.style.display = "none";
    app.style.display = "block";
    userSpan.textContent = user;
    renderHabits();
  }
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const habit = input.value.trim();
  if (habit) {
    const habits = JSON.parse(localStorage.getItem("habitData")) || [];
    habits.push({ name: habit, done: false });
    localStorage.setItem("habitData", JSON.stringify(habits));
    input.value = "";
    renderHabits();
  }
}

function toggleHabit(index) {
  const habits = JSON.parse(localStorage.getItem("habitData")) || [];
  habits[index].done = !habits[index].done;
  localStorage.setItem("habitData", JSON.stringify(habits));
  renderHabits();
}

function renderHabits() {
  const habits = JSON.parse(localStorage.getItem("habitData")) || [];
  const list = document.getElementById("habitList");
  list.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit.name;
    li.className = habit.done ? "completed" : "";
    li.onclick = () => toggleHabit(index);
    list.appendChild(li);
  });
}

showApp();
