import { useToast } from "@/components/ui/use-toast";
import { updateExpense } from "@/services/apiExpenses";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditExpense() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editExpense, isPending: isUpdating } =useMutation({
    mutationFn: ({expense,id}:any) => {
      console.log('use expense expense',expense,id);
      return updateExpense(expense,id);
    },onSuccess:()=>{
      toast({
        title: "Update Expense",
        description: "Expense successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    }
  });
  return {editExpense,isUpdating};
}