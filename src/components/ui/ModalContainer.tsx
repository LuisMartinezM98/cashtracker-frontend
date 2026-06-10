"use client";
import { Fragment, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import AddExpensesForm from "../expenses/AddExpenseForm";
import EditExpensesForm from "../expenses/EditExpensesForm";
import DeleteExpenseForm from "../expenses/DeleteExpenseForm";

export default function ModalContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showModal = searchParams.get("showModal");
  const addExpense = searchParams.get("addExpense");
  const editExpense = searchParams.get("editExpense");
  const deleteExpense = searchParams.get("deleteExpense");

  const show = !!showModal;

  const componentName = useMemo(() => {
    if (addExpense) return "AddExpense" as const;
    if (editExpense) return "EditExpense" as const;
    if (deleteExpense) return "DeleteExpense" as const;
    return null;
  }, [addExpense, editExpense, deleteExpense]);

  const closeModal = useCallback(() => {
    router.replace(pathname);
  }, [pathname, router]);

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  {componentName === "AddExpense" && (
                    <AddExpensesForm closeModal={closeModal} />
                  )}
                  {componentName === "EditExpense" && (
                    <EditExpensesForm closeModal={closeModal} />
                  )}
                  {componentName === "DeleteExpense" && (
                    <DeleteExpenseForm closeModal={closeModal} />
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
