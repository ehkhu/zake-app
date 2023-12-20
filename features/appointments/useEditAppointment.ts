import { useToast } from "@/components/ui/use-toast";
import { updateAppointment } from "@/services/apiAppointments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditAppointment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: editAppointment, isPending: isUpdating } =useMutation({
    mutationFn: ({appointment,id}:any) => {
      console.log('use appointment appointment',appointment,id);
      return updateAppointment(appointment,id);
    },onSuccess:()=>{
      toast({
        title: "Update Appointment",
        description: "Appointment successfully updated",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    }
  });
  return {editAppointment,isUpdating};
}