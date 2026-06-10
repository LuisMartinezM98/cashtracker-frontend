"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/schemas"

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function register(prevState: ActionStateType, formData: FormData) {
    const registerData = {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        password: formData.get("password") as string,
        password_confirmation: formData.get("password_confirmation") as string
    }

    //validar
    const register = RegisterSchema.safeParse(registerData);
    if (!register.success) {
        const errors = register.error.issues.map(error => error.message);
        return { errors, success: prevState.success };
    }
    //registar usuario
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/auth/create-account";
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: register.data.name,
            email: register.data.email,
            password: register.data.password
        })
    })

    const json = await req.json();

    if(req.status === 409){
        const error = ErrorResponseSchema.parse(json);
        return {
            errors: [error.error],
            success: ''
        }
    }

    const successValidation = SuccessSchema.parse(json);



    // const successValidation = SuccessSchema.safeParse(json);
    // if (!successValidation.success) {
    //     return {
    //         errors: [json.message || "Error desconocido"],
    //         success: prevState.success
    //     }
    // }

    return {
        errors: [],
        success: successValidation.message
    }

}