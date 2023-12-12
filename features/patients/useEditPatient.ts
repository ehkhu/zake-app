import { useToast } from "@/components/ui/use-toast";
import { updatePatient } from "@/services/apiPatients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditPatient() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editPatient, isPending: isUpdating } =useMutation({
    mutationFn: ({patient,id}:any) => {
      console.log('use patient patient',patient,id);
      return updatePatient(patient,id);
    },onSuccess:()=>{
      toast({
        title: "Update Patient",
        description: "Patient successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    }
  });
  return {editPatient,isUpdating};
}

  /*
  
  const editPatient = useMutation({
    mutationFn: (newPatient: any) => {
      return createEditPatient(newPatient);
    },
    onSuccess: () => {
      toast({
        title: "Create Patient",
        description: "New patient successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["Patients"] });
      form.reset();
      setErrors({});
    },
    onError: (err) => onError(err),
  });
  */