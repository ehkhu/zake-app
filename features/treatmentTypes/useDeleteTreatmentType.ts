import { useToast } from "@/components/ui/use-toast";
import { destoryTreatmentType } from "@/services/apiTreatmentTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTreatmentType() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteTreatmentType, isPending: isDeleting } = useMutation({
    mutationFn: (treatmentTypeId: any) => {
      return destoryTreatmentType(treatmentTypeId);
    },onSuccess:()=>{
      toast({
        title: "Delete Treatment Type",
        description: "Treatment Type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["treatmentTypes"] });
    }
  });
  return {deleteTreatmentType,isDeleting};
}