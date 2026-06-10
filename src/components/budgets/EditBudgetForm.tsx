"use client";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Budget } from "@/schemas";
import BudgetForm from "./BudgetForm";
import { editBudget } from "@/actions/edit-budget-action";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditBudgetForm({ budget }: { budget: Budget }) {
  const router = useRouter();

  const editBudgetWithId = editBudget.bind(null, budget.id);

  const [state, dispatch] = useActionState(editBudgetWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      router.push('/admin')
    }
  }, [state, router]);

  return (
    <>
      <form action={dispatch} className="mt-10 space-y-3" noValidate>
        {state.errors.map((error, index) => (
          <ErrorMessage key={index}>{error}</ErrorMessage>
        ))}
        <BudgetForm budget={budget} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
