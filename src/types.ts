export type Category = "comida" | "transporte" | "entretenimiento" | "otro";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
}