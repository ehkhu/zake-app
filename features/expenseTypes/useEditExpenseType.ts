import { useToast } from "@/components/ui/use-toast";
import { updateExpenseType } from "@/services/apiExpenseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditExpenseType() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editExpenseType, isPending: isUpdating } =useMutation({
    mutationFn: ({expenseType,id}:any) => {
      console.log('use expenseType expenseType',expenseType,id);
      return updateExpenseType(expenseType,id);
    },onSuccess:()=>{
      toast({
        title: "Update ExpenseType",
        description: "ExpenseType successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["expenseTypes"] });
    }
  });
  return {editExpenseType,isUpdating};
}