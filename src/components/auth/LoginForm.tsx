"use client";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { authenticate } from "@/actions/autenticate-user-action";
export default function LoginForm() {
  const [state, dispatch] = useActionState(authenticate, {
    errors: [],
  });

  const t = useTranslations('RegisterPage');

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state]);

  return (
    <>
      <form action={dispatch} className="mt-14 space-y-5" noValidate>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl">{t('form.email')}</label>

          <input
            id="email"
            type="email"
            placeholder={t('form.email_placeholder')}
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl">{t('form.password')}</label>

          <input
            type="password"
            placeholder={t('form.password_placeholder')}
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <input
          type="submit"
          value={t('form.submit')}
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
