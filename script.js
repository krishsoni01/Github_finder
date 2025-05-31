let input = document.querySelector("#username");
let btn = document.querySelector("button");

function fetchUserProfile(username) {
  return fetch(`https://api.github.com/users/${username}`).then(response => response.json());
}

function fetchUserRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`).then(response => response.json());
}

btn.addEventListener("click", () => {
  if (input.value !== "") {
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('show');
    resultDiv.innerHTML = '<div class="loader"></div>';

    Promise.all([
      fetchUserProfile(input.value),
      fetchUserRepos(input.value)
    ]).then(([userData, reposData]) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="header">
            <img src="${userData.avatar_url}" alt="Avatar" class="avatar">
            <div class="details">
              <div><strong>Name :</strong> ${userData.login}</div>
              <div><strong>Followers :</strong> ${userData.followers}</div>
              <div><strong>Following :</strong> ${userData.following}</div>
              <div><strong>Total Repos :</strong> ${userData.public_repos}</div>
            </div>
          </div>
          <div class="repos">
            <h2>Top 5 Repos</h2>
            <div class="repos-container">
              ${reposData.map(repo => `
                <div class="repo-card">
                  <div class="repo-name"><strong>${repo.name}</strong></div>
                  <div class="repo-desc">${repo.description || "No description available"}</div>
                  <div class="repo-lang">Language : ${repo.language || "N/A"}</div>
                  <div class="repo-lang"> GitHub : <a href="https://github.com/${userData.login}/${repo.name}" target="_blank">https://github.com/${userData.login}/${repo.name}</a></div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }, 2000); 
    });
  }
});
