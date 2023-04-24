import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const form = document.querySelector("#github-form");
const userList = document.querySelector("#user-list");
const reposList = document.querySelector("#repos-list");

form.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = e.target.search.value;
  searchUsers(searchTerm);
});

function searchUsers(term) {
  fetch(`https://api.github.com/search/users?q=${term}`)
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items);
    })
    .catch(error => console.error(error));
}

function displayUsers(users) {
  userList.innerHTML = "";
  for (let user of users) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = user.html_url;
    link.textContent = user.login;
    link.addEventListener("click", () => {
      displayRepositories(user.login);
    });
    listItem.appendChild(link);
    userList.appendChild(listItem);
  }
}

function displayRepositories(user) {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    .then(data => {
      reposList.innerHTML = "";
      for (let repo of data) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.textContent = repo.name;
        listItem.appendChild(link);
        reposList.appendChild(listItem);
      }
    })
    .catch(error => console.error(error));
}

async function getIssues() {
  const octokit = new Octokit({
    auth: "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"
  });

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "octocat",
      repo: "Spoon-Knife"
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getIssues();
