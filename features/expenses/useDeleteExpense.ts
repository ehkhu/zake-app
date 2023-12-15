import { useToast } from "@/components/ui/use-toast";
import { destoryExpense } from "@/services/apiExpenses";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteExpense() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteExpense, isPending: isDeleting } = useMutation({
    mutationFn: (expenseId: any) => {
      return destoryExpense(expenseId);
    },onSuccess:()=>{
      toast({
        title: "Delete Expense Type",
        description: "Expense Type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    }
  });
  return {deleteExpense,isDeleting};
}