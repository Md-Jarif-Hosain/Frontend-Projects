/** @format */

const apiUrl = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("form");

async function getUser(user) {
  const resp = await fetch(apiUrl + user);
  const resData = await resp.json();
  createUrCard(resData);
}
function createUrCard(user) {
  const cardHTML = `
  <div class="card">
      <div class>
        <img class="avatar" src = "${user.avatar_url}" alt = "${user.name}" />
      </div>
      <div class = "user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul class="info">
            <li>${user.followers}</li>
            <li>${user.following}</li>
            <li>${user.public_repos}</li>
        </ul>
      </div>
    </div>

    `;
  main.innerHTML = cardHTML;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchUserHandler();
});
searchBtn.addEventListener("click", function (e) {
e.preventDefault();
searchUserHandler();
});
function searchUserHandler() {
  const user = searchInput.value;

  if (user) {
    getUser(user);
    searchInput.value = " ";
  }
}
