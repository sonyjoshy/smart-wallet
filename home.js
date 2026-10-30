
// Get logged-in user

let loggedInUser = localStorage.getItem("loggedInUser");
let loggedInName = localStorage.getItem("loggedInName");

// Check login

if (!loggedInUser) {

    window.location.href = "index.html";

}

// Display username

document.getElementById("welcomeUser").innerHTML = loggedInName;


// Get user key

function getUserKey(key) {

    return key + "_" + loggedInUser;

}


// Get incomes

function getIncomes() {

    return JSON.parse(localStorage.getItem(getUserKey("incomes"))) || [];

}


// Get expenses

function getExpenses() {

    return JSON.parse(localStorage.getItem(getUserKey("expenses"))) || [];

}


// Format amount

function formatAmount(amount) {

    return "₹ " + Number(amount).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

}


// Add Income

function addIncome() {

    let type = document.getElementById("incomeType").value.trim();
    let amount = Number(document.getElementById("incomeAmount").value);

    if (type == "" || amount <= 0 || !Number.isFinite(amount)) {

        alert("Please enter valid income details");
        return;

    }

    let incomes = getIncomes();

    let income = {

        type: type,
        amount: amount,
        date: new Date().toLocaleString("en-IN")

    };

    incomes.push(income);

    localStorage.setItem(getUserKey("incomes"), JSON.stringify(incomes));

    alert("Income added successfully");

    document.getElementById("incomeType").value = "";
    document.getElementById("incomeAmount").value = "";

    updateDashboard();

}


// Add Expense

function addExpense() {

    let type = document.getElementById("expenseType").value.trim();
    let amount = Number(document.getElementById("expenseAmount").value);

    if (type == "" || amount <= 0 || !Number.isFinite(amount)) {

        alert("Please enter valid expense details");
        return;

    }

    let incomes = getIncomes();
    let expenses = getExpenses();

    let totalIncome = 0;
    let totalExpense = 0;

    incomes.forEach(item => {

        totalIncome += Number(item.amount);

    });

    expenses.forEach(item => {

        totalExpense += Number(item.amount);

    });

    let balance = totalIncome - totalExpense;

    if (amount > balance) {

        alert("Insufficient balance! Available balance: " + formatAmount(balance));
        return;

    }

    let expense = {

        type: type,
        amount: amount,
        date: new Date().toLocaleString("en-IN")

    };

    expenses.push(expense);

    localStorage.setItem(getUserKey("expenses"), JSON.stringify(expenses));

    alert("Expense added successfully");

    document.getElementById("expenseType").value = "";
    document.getElementById("expenseAmount").value = "";

    updateDashboard();

}


// Update Cards

function updateCards() {

    let incomes = getIncomes();
    let expenses = getExpenses();

    let totalIncome = 0;
    let totalExpense = 0;

    incomes.forEach(item => {

        totalIncome += Number(item.amount);

    });

    expenses.forEach(item => {

        totalExpense += Number(item.amount);

    });

    let totalBalance = totalIncome - totalExpense;

    document.getElementById("totalBalance").innerHTML =
        formatAmount(totalBalance);

    document.getElementById("totalExpense").innerHTML =
        formatAmount(totalExpense);

}


// Display Income

function displayIncome() {

    let incomes = getIncomes();
    let expenses = getExpenses();

    let result = document.getElementById("incomeTable");

    result.innerHTML = "";

    if (incomes.length == 0) {

        result.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-secondary p-4">
                    No income records yet.
                </td>
            </tr>
        `;

        return;

    }

    incomes.forEach((item, index) => {

        let balance = 0;

        // Add income up to current row

        for (let i = 0; i <= index; i++) {

            balance += Number(incomes[i].amount);

        }

        // Subtract expenses

        expenses.forEach(expense => {

            balance -= Number(expense.amount);

        });

        result.innerHTML += `
            <tr>
                <td>${item.type}</td>

                <td class="text-success fw-bold">
                    + ${formatAmount(item.amount)}
                </td>

                <td class="fw-bold">
                    ${formatAmount(balance)}
                </td>

                <td>${item.date}</td>
            </tr>
        `;

    });

}


// Display Expense

function displayExpense() {

    let expenses = getExpenses();
    let incomes = getIncomes();

    let result = document.getElementById("expenseTable");

    result.innerHTML = "";

    if (expenses.length == 0) {

        result.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-secondary p-4">
                    No expense records yet.
                </td>
            </tr>
        `;

        return;

    }

    let totalIncome = 0;
    let balance = 0;

    incomes.forEach(item => {

        totalIncome += Number(item.amount);

    });

    balance = totalIncome;

    expenses.forEach(item => {

        balance -= Number(item.amount);

        result.innerHTML += `
            <tr>
                <td>${item.type}</td>

                <td class="text-danger fw-bold">
                    - ${formatAmount(item.amount)}
                </td>

                <td class="fw-bold">
                    ${formatAmount(balance)}
                </td>

                <td>${item.date}</td>
            </tr>
        `;

    });

}


// Clear All Transactions

function clearTransactions() {

    let confirmClear = confirm("Are you sure you want to clear all transactions?");

    if (confirmClear) {

        localStorage.removeItem(getUserKey("incomes"));

        localStorage.removeItem(getUserKey("expenses"));

        alert("All transactions cleared successfully");

        updateDashboard();

    }

}


// Logout

function logout() {

    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("loggedInName");

    window.location.href = "index.html";

}


// Update Dashboard

function updateDashboard() {

    updateCards();

    displayIncome();

    displayExpense();

}


// Initial Display

updateDashboard();
