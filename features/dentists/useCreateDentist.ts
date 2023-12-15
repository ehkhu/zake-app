import { useToast } from "@/components/ui/use-toast";
import { storeDentist } from "@/services/apiDentists";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateDentist() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createDentist, isPending: isCreating } =useMutation({
    mutationFn: (newDentist: any) => {
      console.log('use create dentist',newDentist);
      return storeDentist(newDentist);
    },onSuccess:()=>{
      toast({
        title: "Create Dentist",
        description: "New dentist successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["dentists"] });
    }
  });
  return {createDentist,isCreating};
}

  /*
  
  const createDentist = useMutation({
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