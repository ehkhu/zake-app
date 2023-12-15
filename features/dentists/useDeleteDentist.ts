import { useToast } from "@/components/ui/use-toast";
import { destoryDentist } from "@/services/apiDentists";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteDentist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteDentist, isPending: isDeleting } = useMutation({
    mutationFn: (dentistId: any) => {
      console.log('use create dentist',dentistId);
      return destoryDentist(dentistId);
    },onSuccess:()=>{
      toast({
        title: "Delete Dentist",
        description: "Dentist successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["dentists"] });
    }
  });
  return {deleteDentist,isDeleting};
}