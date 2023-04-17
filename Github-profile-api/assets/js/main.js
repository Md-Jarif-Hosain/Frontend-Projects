/** @format */
/**
 * Author : Md Jarif Hosain.
 * Date : April 12, 2023.
 *
 * Basic Github API project.
 */

// Globals
const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const form = document.getElementById("form");

// event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchUserHandler();
});
searchBtn.addEventListener("click", function (e) {
  searchUserHandler();
});
function searchUserHandler() {
  const user = searchInput.value;
  if (user) {
    getUser(user);
    searchInput.value = " ";
  }
  window.reload();
}

// Async functions
async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const resData = await resp.json();
  createUrCard(resData);
  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

// DOM Functions

/**
 * Creating a user card with api's infos
 * @param {object} user
 * @returns {DOM Element}
 */
function createUrCard(user) {
  const cardHTML = `
  <div class="card">
      <div class>
        <img class="avatar" src = "${user.avatar_url}" alt = "${user.name}" />
      </div>
      <div class = "user-info">
        <h2>${user.name}</h2>
        <p>${user.location}</p>
        <p class = "bio">${user.bio}</p>


        <ul class="info">
            <li>${user.followers}<strong>Followers.</strong></li>
            <li>${user.following}<strong>Following.</strong></li>
            <li>${user.public_repos}<strong>Repos.</strong></li>
        </ul>

        <div class="repos" id="repos"></div>
      </div>

  </div>

    `;
  main.innerHTML = cardHTML;
}

/**
 * Get users public-repos. and showing first 10 repos
 * @param {Array of object} repos
 * @returns {DOM Element}
 */
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  if (repos.length > 10) {
    repos.slice(0, 10).forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
  } else {
    repos.forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");

      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
  }
}
