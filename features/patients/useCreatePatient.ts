import { useToast } from "@/components/ui/use-toast";
import { storePatient } from "@/services/apiPatients";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePatient() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createPatient, isPending: isCreating } =useMutation({
    mutationFn: (newPatient: any) => {
      console.log('use create patient',newPatient);
      return storePatient(newPatient);
    },onSuccess:()=>{
      toast({
        title: "Create Patient",
        description: "New patient successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    }
  });
  return {createPatient,isCreating};
}

  /*
  
  const createPatient = useMutation({
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