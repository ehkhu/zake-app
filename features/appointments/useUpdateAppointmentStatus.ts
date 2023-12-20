import { useToast } from "@/components/ui/use-toast";
import { updateAppointment } from "@/services/apiAppointments";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateAppointmentStatus() {
    let updateId = "0";
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { mutate: updateAppointmentStatus, isPending: isUpdating } =useMutation({
      mutationFn: ({appointment,id}:any) => {
        console.log('use appointment appointment',appointment,id);
        updateId = id;
        console.log('update id appointment',appointment,updateId);
        return updateAppointment(appointment,id);
    },onSuccess:()=>{
        toast({
            title: "Update Appointment",
            description: "Appointment successfully updated",
        });
        console.log("query invalidateQueries")
        queryClient.invalidateQueries();
      }
    });
    return {updateAppointmentStatus,isUpdating};
  }