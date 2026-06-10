"use client";
import { useParams, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { startTransition, useActionState, useEffect } from "react";
import deleteExpense from "@/actions/delete-expense-action";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { DraftExpense } from "@/schemas";
import useSWR from "swr";

type DeleteExpenseForm = {
  closeModal: () => void;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DeleteExpenseForm({ closeModal }: DeleteExpenseForm) {
  const params = useParams()!;
  const budgetId = params.id as string;
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("deleteExpenseId")!;

  const deleteExpenseWithBudgetId = deleteExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });

  const [state, dispatch] = useActionState(deleteExpenseWithBudgetId, {
    errors: [],
    success: "",
  });
  const url =
    budgetId && expenseId
      ? `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
      : null;
  const { data: expense } = useSWR<DraftExpense>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  console.log(expense);
  useEffect(() => {
    if (!Number.isInteger(+budgetId) || !Number.isInteger(+expenseId)) {
      closeModal();
    }
  }, [budgetId, expenseId, closeModal]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state.success, closeModal]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Gasto
      </DialogTitle>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      <p className="text-xl font-bold">
        Confirma para eliminar, {""}
        <span className="text-amber-500">{expense?.name}</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un gasto eliminado no se puede recuperar)
      </p>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <button
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          onClick={closeModal}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-red-500 w-full p-3 text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
          onClick={() => startTransition(() => dispatch())}
        >
          Eliminar
        </button>
      </div>
    </>
  );
}
