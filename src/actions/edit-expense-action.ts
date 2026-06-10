"use server";

import getToken from "@/auth/token";
import {
  Budget,
  DraftExpenseSchema,
  ErrorResponseSchema,
  Expense,
  SuccessSchema,
} from "@/schemas";
import { revalidatePath } from "next/cache";

type BudgetAndExpenseId = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

type ActionStateType = {
  errors: string[];
  success: string;
};

export default async function editExpenseb(
  { budgetId, expenseId }: BudgetAndExpenseId,
  prevState: ActionStateType,
  formData: FormData,
) {
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/budgets/${budgetId}/expenses/${expenseId}`;
  const token = await getToken();
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);

  revalidatePath(`/admin/budgets/${budgetId}`);

  return {
    errors: [],
    success: success.message,
  };
}
