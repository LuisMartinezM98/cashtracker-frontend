"use client"
import { useTranslations } from "next-intl";


import { register } from "@/actions/create-account-action"
import { useActionState, useEffect, useRef } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";

export default function RegisterForm() {

    const ref = useRef<HTMLFormElement>(null)

    const t = useTranslations('RegisterPage');


    const [state, dispatch] = useActionState(register, {
        errors: [],
        success: ''
    });

    useEffect(() => {
        if(state.success){
            ref.current?.reset()
        }
    }, [state])


    return (
        <form
            ref={ref}
            className="mt-14 space-y-5"
            noValidate
            action={dispatch}
        >
            {state.errors.map((errorKey, index) => (
                <ErrorMessage key={index}>
                    {t(`errors.${errorKey}`)}
                </ErrorMessage>
            ))}
            {state.success && <SuccessMessage>{t(`errors.${state.success}`)}</SuccessMessage>}
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                    htmlFor="email"
                >{t('form.email')}</label>
                <input
                    id="email"
                    type="email"
                    placeholder={t('form.email_placeholder')}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >{t('form.name')}</label>
                <input
                    type="name"
                    placeholder={t('form.name_placeholder')}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >{}{t('form.password')}</label>
                <input
                    type="password"
                    placeholder={t('form.password_placeholder')}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl"
                >{}{t('form.password_confirm')}</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder={t('form.password_confirm_placeholder')}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                    name="password_confirmation"
                />
            </div>

            <input
                type="submit"
                value={t('form.submit')}
                className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
            />
        </form>
    )
}
