import { useToast } from "@/components/ui/use-toast";
import { destoryAppointment } from "@/services/apiAppointments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAppointment() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteAppointment, isPending: isDeleting } = useMutation({
    mutationFn: (appointmentId: any) => {
      return destoryAppointment(appointmentId);
    },onSuccess:()=>{
      toast({
        title: "Delete Appointment Type",
        description: "Appointment Type successfully created",
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    }
  });
  return {deleteAppointment,isDeleting};
}