import "server-only";
import { cache } from "react";
import { UserSchema } from "@/schemas";
import { redirect } from "next/navigation";
import getToken from "./token";

export const verifySession = cache(async () => {
  const token = await getToken();

  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`;
  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const session = await req.json();

  const result = UserSchema.safeParse(session);

  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
