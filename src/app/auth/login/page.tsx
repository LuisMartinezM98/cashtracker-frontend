import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { getTranslations } from "next-intl/server";
import getToken from "@/auth/token";
import { redirect } from "next/navigation";

const t = await getTranslations("LoginPage");

export const metadata: Metadata = {
  title: t("metadata-title"),
  description: t("metadata-description"),
};

// const token = await getToken();
// if (token) {
//   redirect("/admin");
// }

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">{t("title")}</h1>
      <p className="text-3xl font-bold">
        {t("subtitle")} <span className="text-amber-500">{t("span")}</span>
      </p>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/register" className="text-center text-gray-500">
          {t("singup_link")}
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          {t("forgotpassword_link")}
        </Link>
      </nav>
    </>
  );
}
