"use server";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

import { ErrorResponseSchema, LoginSchema } from "@/schemas";
type ActionStateType = {
  errors: string[];
};

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData,
) {

  const cookieStore = await cookies();

  const loginCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const auth = LoginSchema.safeParse(loginCredentials);
  if (!auth.success) {
    return {
      errors: auth.error.issues.map((issue) => issue.message),
    };
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });
  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
    };
  }

  // Setear cookies
  cookieStore.set({
    name: 'CASHTRACKR_TOKEN',
    value: json,
    httpOnly: true,
    path: '/'
  })

  redirect('/admin')
}
