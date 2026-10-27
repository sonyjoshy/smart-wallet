const username = localStorage.getItem("loggedInUser");

if (!username) {
    alert("Please login first.");
    window.location.href = "index.html";
} else {
    document.getElementById("welcomeUser").textContent = username;

    const incomeForm = document.getElementById("incomeForm");
    const expenseForm = document.getElementById("expenseForm");
    const clearBtn = document.getElementById("clearBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const storageKey = "transactions_" + username;

    function getTransactions() {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }

    function saveTransactions(transactions) {
        localStorage.setItem(storageKey, JSON.stringify(transactions));
    }

    function renderTransactions() {
        const transactions = getTransactions();

        let balance = 0;
        let totalExpense = 0;

        const incomeTable = document.getElementById("incomeTable");
        const expenseTable = document.getElementById("expenseTable");

        incomeTable.innerHTML = "";
        expenseTable.innerHTML = "";

        transactions.forEach(function (transaction) {
            if (transaction.type === "income") {
                balance += transaction.amount;
            } else {
                balance -= transaction.amount;
                totalExpense += transaction.amount;
            }

            const row = document.createElement("tr");

            const values = [
                transaction.category,
                (transaction.type === "income" ? "+" : "-") +
                    transaction.amount.toFixed(2),
                balance.toFixed(2),
                transaction.date
            ];

            values.forEach(function (value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            if (transaction.type === "income") {
                incomeTable.appendChild(row);
            } else {
                expenseTable.appendChild(row);
            }
        });

        document.getElementById("totalBalance").textContent =
            "Rs " + balance.toFixed(2) + "/-";

        document.getElementById("totalExpense").textContent =
            "Rs " + totalExpense.toFixed(2) + "/-";
    }

    incomeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const category = document.getElementById("incomeType").value.trim();
        const amount = Number(document.getElementById("incomeAmount").value);

        if (!category || !Number.isFinite(amount) || amount <= 0) {
            alert("Please enter valid income details.");
            return;
        }

        const transactions = getTransactions();

        transactions.push({
            type: "income",
            category: category,
            amount: amount,
            date: new Date().toLocaleString()
        });

        saveTransactions(transactions);
        renderTransactions();
        incomeForm.reset();

        alert("Income Added Successfully!");
    });

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const category = document.getElementById("expenseType").value.trim();
        const amount = Number(document.getElementById("expenseAmount").value);

        if (!category || !Number.isFinite(amount) || amount <= 0) {
            alert("Please enter valid expense details.");
            return;
        }

        const transactions = getTransactions();

        transactions.push({
            type: "expense",
            category: category,
            amount: amount,
            date: new Date().toLocaleString()
        });

        saveTransactions(transactions);
        renderTransactions();
        expenseForm.reset();

        alert("Expense Added Successfully!");
    });

    clearBtn.addEventListener("click", function () {
        const confirmed = confirm(
            "Are you sure you want to clear all transactions?"
        );

        if (confirmed) {
            localStorage.removeItem(storageKey);
            renderTransactions();

            alert("All transactions cleared.");
        }
    });

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });

    renderTransactions();
}