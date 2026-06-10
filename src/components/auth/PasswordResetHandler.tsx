"use client";
import { useState } from "react";
import ValidateTokenForm from "./ValidateTokenForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function PasswordResetHandler() {
  const [isValidate, setIsValidateToken] = useState(false);
  const [token, setToken] = useState("");
  return (
    <>
      {!isValidate ? (
        <ValidateTokenForm
          setIsValidateToken={setIsValidateToken}
          token={token}
          setToken={setToken}
        />
      ) : (
        <ResetPasswordForm 
        token = {token}
        />
      )}
    </>
  );
}
