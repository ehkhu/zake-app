import { useToast } from "@/components/ui/use-toast";
import { storeTreatmentType } from "@/services/apiTreatmentTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTreatmentType() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createTreatmentType, isPending: isCreating } =useMutation({
    mutationFn: (newTreatmentType: any) => {
      console.log('use create treatment type',newTreatmentType);
      return storeTreatmentType(newTreatmentType);
    },onSuccess:()=>{
      toast({
        title: "Create Treatment type",
        description: "New treatment type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["treatmentTypes"] });
    }
  });
  return {createTreatmentType,isCreating};
}
