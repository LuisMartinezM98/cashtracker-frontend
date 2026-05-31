import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.string()
        .min(1, "email_required")  
        .email("email_invalid"),  
    name: z.string()
        .min(2, "name_required"),
    password: z.string()
        .min(8, "password_short"),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "passwords_dont_match",
    path: ["password_confirmation"]
});

export const SuccessSchema = z.object({
    message: z.string()
});