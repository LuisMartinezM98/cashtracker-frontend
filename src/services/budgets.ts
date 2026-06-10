import getToken from "@/auth/token";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BudgetAPIResponseSchema } from "@/schemas";


export const getBudget = cache(async (budgetId: string) => {
  const token = await getToken();

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/budgets/${budgetId}`;
  const req = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["all-budgets"],
    },
  });
  const json = await req.json();
  if (!req.ok) {
    notFound();
  }
  console.log(json)
  const budget = BudgetAPIResponseSchema.parse(json);
  return budget;
});