import { useToast } from "@/components/ui/use-toast";
import { storeExpenseType } from "@/services/apiExpenseTypes";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateExpenseType() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createExpenseType, isPending: isCreating } =useMutation({
    mutationFn: (newExpenseType: any) => {
      console.log('use create expense type',newExpenseType);
      return storeExpenseType(newExpenseType);
    },onSuccess:()=>{
      toast({
        title: "Create Expense type",
        description: "New expense type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["expenseTypes"] });
    }
  });
  return {createExpenseType,isCreating};
}
