

function register() {

    let name = document.getElementById("regUsername").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("regPassword").value;

    if (name == "" || email == "" || password == "") {

        alert("Please fill all fields");
        return;

    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check existing email

    let existingUser = users.find(user => user.email.toLowerCase() == email.toLowerCase());

    if (existingUser) {

        alert("Email is already registered");
        return;

    }

    // Create new user

    let newUser = {

        name: name,
        email: email,
        password: password

    };

    users.push(newUser);

    // Store user details

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully");

    window.location.href = "index.html";

}
