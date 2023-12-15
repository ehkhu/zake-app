import { useToast } from "@/components/ui/use-toast";
import { storeExpense } from "@/services/apiExpenses";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateExpense() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createExpense, isPending: isCreating } =useMutation({
    mutationFn: (newExpense: any) => {
      console.log('use create expense ',newExpense);
      return storeExpense(newExpense);
    },onSuccess:()=>{
      toast({
        title: "Create Expense ",
        description: "New expense  successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    }
  });
  return {createExpense,isCreating};
}
