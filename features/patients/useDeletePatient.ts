import { useToast } from "@/components/ui/use-toast";
import { destoryPatient } from "@/services/apiPatients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePatient() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deletePatient, isPending: isDeleting } = useMutation({
    mutationFn: (patientId: any) => {
      console.log('use create patient',patientId);
      return destoryPatient(patientId);
    },onSuccess:()=>{
      toast({
        title: "Delete Patient",
        description: "Patient successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    }
  });
  return {deletePatient,isDeleting};
}