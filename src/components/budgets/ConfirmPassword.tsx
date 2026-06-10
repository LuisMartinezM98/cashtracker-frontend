import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { useActionState, useCallback, useEffect, useMemo, useRef } from "react";
import { deleteBudget } from "@/actions/delete-budget-action";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function ConfirmPasswordForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = searchParams.get("deleteBudget")!;
  const deleteBudgetWithId = useMemo(
    () => deleteBudget.bind(null, +budgetId),
    [budgetId],
  );

  const [state, dispatch] = useActionState(deleteBudgetWithId, {
    errors: [],
    success: "",
  });

  const closeModal = useCallback(() => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete("deleteBudget");
    router.replace(`${pathname}?${hideModal}`);
  }, [pathname, router, searchParams]);

  const toastShow = useRef(false);

  useEffect(() => {
    if (state.success && !toastShow.current) {
      toastShow.current = true;
      toast.success(state.success);
      closeModal();
    }
  }, [state.success, closeModal]);

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Eliminar Presupuesto
      </DialogTitle>
      <p className="text-xl font-bold">
        Ingresa tu Password para {""}
        <span className="text-amber-500">eliminar el presupuesto {""}</span>
      </p>
      <p className="text-gray-600 text-sm">
        (Un presupuesto eliminado y sus gastos no se pueden recuperar)
      </p>
      {state.errors.map((error, index) => (
        <ErrorMessage key={index}>{error}</ErrorMessage>
      ))}
      <form className=" mt-14 space-y-5" noValidate action={dispatch}>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="password">
            Ingresa tu Password para eliminar
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <input
            type="submit"
            value="Eliminar Presupuesto"
            className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
          />
          <button
            className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
}
