import { useToast } from "@/components/ui/use-toast";
import { updateTreatment } from "@/services/apiTreatments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditTreatment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editTreatment, isPending: isUpdating } =useMutation({
    mutationFn: ({treatment,id}:any) => {
      console.log('use treatment treatment',treatment,id);
      return updateTreatment(treatment,id);
    },onSuccess:()=>{
      toast({
        title: "Update Treatment",
        description: "Treatment successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["treatments"] });
    }
  });
  return {editTreatment,isUpdating};
}