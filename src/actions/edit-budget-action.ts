"use server";

import getToken from "@/auth/token";
import { Budget, DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/schemas";
import { revalidateTag } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function editBudget(
  budgetId: Budget["id"],
  prevSate: ActionStateType,
  formData: FormData,
) {
  const budgetData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
  };

  const budget = DraftBudgetSchema.safeParse(budgetData);

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/budgets/${budgetId}`;
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
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
  
  revalidateTag('/all-budgets', 'max')

  return {
    errors: [],
    success: success.message
  };
}
