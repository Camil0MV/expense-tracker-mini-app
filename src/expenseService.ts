import type { Category, Expense } from "./types";

export class ExpenseService {
  private expenses: Expense[] = [];

  addExpense(description: string, amount: number, category: Category) {
    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount,
      category,
    };

    this.expenses.push(newExpense);
    return newExpense;
  }
  
  getExpenses(category: Category | 'all' = 'all'): Expense[] {
    if (category === 'all') return this.expenses;
    return this.expenses.filter((e) => e.category === category);
  }
  
  removeExpense(id: number): void {
    this.expenses = this.expenses.filter((e) => e.id !== id);
  }

  getTotal(category: Category | 'all' = 'all'): number {
    return this.getExpenses(category).reduce((acc, e) => acc + e.amount, 0);
  }
}