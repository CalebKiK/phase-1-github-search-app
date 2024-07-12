document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const searchInput = document.getElementById("search");
    const userResults = document.getElementById("user-list");
    const reposResultsDiv = document.getElementById("repos-list");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = searchInput.ariaValueMax;
        searchUsers(query);
    });

    function searchUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json)
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error fetching users:', error))
    };

    function displayUsers(users) {
        userResults.innerHTML = '';
        userResults.forEach(user => {
            const userList = document.createElement("li");
            const userDiv = document.createElement("div");

            userDiv.className = "user";
            userDiv.textContent = user.login;
            userDiv.addEventListener("click", () => {
                fetchUserRepos(user.login);
            });

            userResults.appendChild(userList);
            userList.appendChild(userDiv);
        });
    };

    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error("Error fetching repository:", error));
    };

    function displayRepos(repos) {
        reposResultsDiv.innerHTML = '';
        repos.forEach(repo => {
            const repoLi = document.createElement("li");
            const repoDiv = document.createElement('div');
            repoDiv.className = 'repo';
            repoDiv.textContent = repo.name;

            reposResultsDiv.appendChild(repoLi);
            repoLi.appendChild(repoDiv);
        });
    }
});
