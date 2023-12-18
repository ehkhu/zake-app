import { useToast } from "@/components/ui/use-toast";
import { storeTreatment } from "@/services/apiTreatments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTreatment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createTreatment, isPending: isCreating } =useMutation({
    mutationFn: (newTreatment: any) => {
      console.log('use create treatment ',newTreatment);
      return storeTreatment(newTreatment);
    },onSuccess:()=>{
      toast({
        title: "Create Treatment ",
        description: "New treatment  successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    }
  });
  return {createTreatment,isCreating};
}
