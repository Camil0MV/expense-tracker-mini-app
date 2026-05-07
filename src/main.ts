import "./style.css";
import { ExpenseService } from "./expenseService";
import type { Category } from "./types";

const service = new ExpenseService()

const form = document.querySelector<HTMLFormElement>('#expense-form')!;
const descInput = document.querySelector<HTMLInputElement>('description')!;
const amountInput = document.querySelector<HTMLInputElement>('amount')!;
const categorySelect = document.querySelector<HTMLSelectElement>('category')!;
const filterSelect = document.querySelector<HTMLSelectElement>('filter-category')!;
const expenseList = document.querySelector<HTMLUListElement>('expense-list')!;
const totalDisplay = document.querySelector<HTMLSpanElement>('total-amount')!;

form.addEventListener('submit', (e) => {
    e.preventDefault;

    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value as Category;

    if (description && !isNaN(amount) && amount > 0) {
        service.addExpense(description, amount, category);
        render();
        form.reset();
        descInput.focus();
    }
});

filterSelect.addEventListener('change', () => {
    render();
});

expenseList.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-delete')) {
        const id = Number(target.dataset.id);
        service.removeExpense(id);
        render();
    }
});

function render() {
    const filter = filterSelect.value as Category | 'all';
    const expenses = service.getExpenses(filter);
    const total = service.getTotal(filter);
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        expenseList.innerHTML = '<li class="empty">No hay gastos registrados.</li>';
    } else {
        expenses.forEach((expense) => {
            const li = document.createElement('li');
            li.className = 'expense-item';
            li.innerHTML = `
                <div class="expense-info">
                    <span class="expense-description">${expense.description}</span>
                    <span class="expense-description">${expense.description}</span>
                </div>
                
                <div class="expense-right">
                <strong>$${expense.amount.toFixed(2)}</strong>
                <button class="btn-delete" data-id="${expense.id}">x</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    totalDisplay.textContent = `$${service.getTotal(filter).toFixed(2)}`;
}