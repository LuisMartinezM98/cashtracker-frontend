"use server";
import {
  DraftBudgetSchema,
  ErrorResponseSchema,
  SuccessSchema,
} from "@/schemas";
import getToken from "@/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function createBudget(
  PrevState: ActionStateType,
  formData: FormData,
) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });
  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const token = await getToken();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/budgets`;
  const req = await fetch(url, {
    method: "POST",
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

  revalidatePath("/admin");
  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success: success.message,
  };
}
