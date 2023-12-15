import { useToast } from "@/components/ui/use-toast";
import { updateDentist } from "@/services/apiDentists";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditDentist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editDentist, isPending: isUpdating } =useMutation({
    mutationFn: ({dentist,id}:any) => {
      console.log('use dentist dentist',dentist,id);
      return updateDentist(dentist,id);
    },onSuccess:()=>{
      toast({
        title: "Update Dentist",
        description: "Dentist successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["dentists"] });
    }
  });
  return {editDentist,isUpdating};
}

  /*
  
  const editDentist = useMutation({
    mutationFn: (newDentist: any) => {
      return createEditDentist(newDentist);
    },
    onSuccess: () => {
      toast({
        title: "Create Dentist",
        description: "New dentist successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["Dentists"] });
      form.reset();
      setErrors({});
    },
    onError: (err) => onError(err),
  });
  */