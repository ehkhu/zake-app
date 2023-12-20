import { useToast } from "@/components/ui/use-toast";
import { storeAppointment } from "@/services/apiAppointments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAppointment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: createAppointment, isPending: isCreating } =useMutation({
    mutationFn: (newAppointment: any) => {
      console.log('use create appointment ',newAppointment);
      return storeAppointment(newAppointment);
    },onSuccess:()=>{
      toast({
        title: "Create Appointment ",
        description: "New appointment  successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    }
  });
  return {createAppointment,isCreating};
}
