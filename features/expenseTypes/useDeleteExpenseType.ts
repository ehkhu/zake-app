import { useToast } from "@/components/ui/use-toast";
import { destoryExpenseType } from "@/services/apiExpenseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteExpenseType() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteExpenseType, isPending: isDeleting } = useMutation({
    mutationFn: (expenseTypeId: any) => {
      return destoryExpenseType(expenseTypeId);
    },onSuccess:()=>{
      toast({
        title: "Delete Expense Type",
        description: "Expense Type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["expenseTypes"] });
    }
  });
  return {deleteExpenseType,isDeleting};
}