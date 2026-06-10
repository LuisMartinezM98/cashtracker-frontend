import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.email("email_invalid"),
    name: z.string().min(2, "name_required"),
    password: z.string().min(8, "password_short"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "passwords_dont_match",
    path: ["password_confirmation"],
  });

export const TokenSchema = z
  .string({ message: "token_required" })
  .length(6, { message: "token_required" });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "password_required" });

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "El nombre del gasto es obligatorio" }),
  amount: z.coerce.number().min(1, { message: "Cantidad no válida" }),
});

export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, { message: "password_required" }),
    password: z.string().min(8, { message: "password_short" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "passwords_dont_match",
    path: ["password_confirmation"],
  });

export const UpdateInfoUserSchema = z.object({
  email: z.email('email_invalid'),
  name: z.string().min(2, "name_required"),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El Email es Obligatorio" })
    .email({ message: "Email no válido" }),
  password: z.string().min(1, { message: "El Password no puede ir vacio" }),
});

export const SuccessSchema = z.object({
  message: z.string(),
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

export const ExpenseApiReponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  budgetId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseApiReponseSchema),
});

export const BudgetsAPIResponseSchema = z.array(
  BudgetAPIResponseSchema.omit({ expenses: true }),
);

export type User = z.infer<typeof UserSchema>;

export type Budget = z.infer<typeof BudgetAPIResponseSchema>;
export type DraftExpense = z.infer<typeof DraftExpenseSchema>;

export type Expense = z.infer<typeof ExpenseApiReponseSchema>;
