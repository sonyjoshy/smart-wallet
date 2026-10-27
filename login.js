const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function (item) {
        return item.username.toLowerCase() === username.toLowerCase() &&
               item.password === password;
    });

    if (user) {
        localStorage.setItem("loggedInUser", user.username);

        alert("Login Successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password. Please register if you do not have an account.");
    }
});