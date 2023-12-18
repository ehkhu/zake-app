import { useToast } from "@/components/ui/use-toast";
import { destoryTreatment } from "@/services/apiTreatments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTreatment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteTreatment, isPending: isDeleting } = useMutation({
    mutationFn: (treatmentId: any) => {
      return destoryTreatment(treatmentId);
    },onSuccess:()=>{
      toast({
        title: "Delete Treatment Type",
        description: "Treatment Type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    }
  });
  return {deleteTreatment,isDeleting};
}