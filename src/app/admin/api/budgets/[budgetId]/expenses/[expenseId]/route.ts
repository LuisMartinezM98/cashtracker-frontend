import { verifySession } from "@/auth/dal";
import getToken from "@/auth/token";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> },
) {
  await verifySession();

  const { budgetId, expenseId } = await params;

  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/budgets/${budgetId}/expenses/${expenseId}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();

  if (!req.ok) {
    return Response.json(json.error, { status: req.status });
  }

  return Response.json(json);
}