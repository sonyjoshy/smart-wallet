
function login() {

    let name = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (name == "" || password == "") {

        alert("Please fill all fields");
        return;

    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user

    let user = users.find(item =>
        item.name.toLowerCase() == name.toLowerCase() &&
        item.password == password
    );

    if (user) {

        alert("Login successful");

        localStorage.setItem("loggedInUser", user.email);
        localStorage.setItem("loggedInName", user.name);

        window.location.href = "home.html";

    } else {

        alert("Invalid username or password");

    }

}
