"use server";

import getToken from "@/auth/token";
import { ErrorResponseSchema, SuccessSchema, UpdateInfoUserSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updateUserInfo(
  prevState: ActionStateType,
  formData: FormData,
) {
  const updateInfo = UpdateInfoUserSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  if (!updateInfo.success) {
    return {
      errors: updateInfo.error.issues.map((error) => error.message),
      success: "",
    };
  }
  const token = await getToken();
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/auth/user";
  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: updateInfo.data.email,
      name: updateInfo.data.name,
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
  revalidatePath('/admin/profile/settings')

  return {
    errors: [],
    success: success.message,
  };
}
