import { useActionState, useEffect } from "react";
import { DialogTitle } from "@headlessui/react";
import useSWR from "swr";
import ExpenseForm from "./ExpenseForm";
import { useParams, useSearchParams } from "next/navigation";
import { DraftExpense } from "@/schemas";
import editExpense from "@/actions/edit-expense-action";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const params = useParams();
  const budgetId = params.id as string;
  const searchParams = useSearchParams();
  const expenseId = searchParams.get("editExpenseId")!;

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  });

  const [state, dispatch] = useActionState(editExpenseWithBudgetId, {
    errors: [],
    success: "",
  });

  const url =
    budgetId && expenseId
      ? `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
      : null;
  const {
    data: expense,
    isLoading,
    error,
  } = useSWR<DraftExpense>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      closeModal();
    }
  }, [state.success, closeModal]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">
        Edita los detalles de un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  );
}
