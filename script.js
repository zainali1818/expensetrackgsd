document.addEventListener("DOMContentLoaded", function () {
    const expenseChartEl = document.getElementById("expenseChart").getContext("2d");

    const expenseChart = new Chart(expenseChartEl, {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Expenses Over Time",
                data: [],
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    const expenseList = document.getElementById("expenseList");
    const expenseNameInput = document.getElementById("expenseName");
    const expenseAmountInput = document.getElementById("expenseAmount");
    const addExpenseButton = document.getElementById("addExpense");

    addExpenseButton.addEventListener("click", function () {
        const itemName = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);
        
        if (itemName === "") {
            alert("Please enter a valid item name.");
            return;
        }

        if (!isNaN(amount) && amount >= 0) {
            const currentDate = new Date();
            const dateString = currentDate.toLocaleDateString("en-US");
            
            expenseChart.data.labels.push(dateString);
            expenseChart.data.datasets[0].data.push(amount);
            expenseChart.update();
            
            const expenseItem = document.createElement("li");
            expenseItem.innerHTML = `
                <span>${dateString}</span>
                <span>${itemName}</span>
                <span>$${amount.toFixed(2)}</span>
            `;
            expenseList.appendChild(expenseItem);
            
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        } else {
            alert("Please enter a valid amount.");
        }
    });
});
