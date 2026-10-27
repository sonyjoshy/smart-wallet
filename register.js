const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("regPassword").value;

    if (!username || !email || !password) {
        alert("Please enter all fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(function (user) {
        return user.username.toLowerCase() === username.toLowerCase() ||
               user.email.toLowerCase() === email.toLowerCase();
    });

    if (existingUser) {
        alert("Username or email already exists.");
        return;
    }

    users.push({
        username: username,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("User Registered Successfully!");
    window.location.href = "index.html";
});