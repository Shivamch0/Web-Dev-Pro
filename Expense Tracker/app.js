document.addEventListener('DOMContentLoaded', () => {

    const expenseForm = document.getElementById('expenses-form');
    const expenseInput = document.getElementById('expense-input');
    const amountInput = document.getElementById('amount-input');
    const expenseContainer = document.getElementById('expenses-container');
    const showTotalMsg = document.getElementById('total-amount');
    const deleteBtn = document.getElementById('delete-btn');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener('submit' , (event) => {
        event.preventDefault();
        const name = expenseInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id : Date.now(),
                name : name,
                amount : amount
            }
            expenses.push(newExpense);
            saveExpense();
            renderExpenses();
            updateTotal();
            
            // clear Input //
            expenseInput.value = "";
            amountInput.value = "";
        }
    });

    function calculateTotal() {
        return expenses.reduce((sum , expense) => sum + expense.amount , 0 )

        //---------- This method also works for this--------- //
        // let totalPrice = 0;
        // expenses.forEach((expense) => {
        //     totalPrice += expense.amount;
        // });
    };

    function updateTotal(){
        totalAmount = calculateTotal();
        showTotalMsg.textContent = totalAmount.toFixed(2);
    }

    function renderExpenses(){
        expenseContainer.innerHTML = "";
        expenses.forEach((cost) => {
            const showExpenses = document.createElement('section');
            showExpenses.classList.add('show-expenses');
            showExpenses.innerHTML = `
                <p>${cost.name} - $${cost.amount}</p>
                <button data-id="${cost.id}">Delete</button>
            `;
            expenseContainer.appendChild(showExpenses);
        });
    }

    function saveExpense(){
        localStorage.setItem('expenses' , JSON.stringify(expenses));
    }

    expenseContainer.addEventListener('click' , (e) => {
        if(e.target.tagName === "BUTTON"){
        const deleteId = parseInt(e.target.getAttribute('data-id'));
        expenses = expenses.filter(expense => expense.id !== deleteId);

        saveExpense();
        renderExpenses();
        updateTotal();
        }
    });

}); //DOM Ended