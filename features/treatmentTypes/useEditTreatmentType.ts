import { useToast } from "@/components/ui/use-toast";
import { updateTreatmentType } from "@/services/apiTreatmentTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditTreatmentType() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editTreatmentType, isPending: isUpdating } =useMutation({
    mutationFn: ({treatmentType,id}:any) => {
      console.log('use treatmentType treatmentType',treatmentType,id);
      return updateTreatmentType(treatmentType,id);
    },onSuccess:()=>{
      toast({
        title: "Update TreatmentType",
        description: "TreatmentType successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["treatmentTypes"] });
    }
  });
  return {editTreatmentType,isUpdating};
}