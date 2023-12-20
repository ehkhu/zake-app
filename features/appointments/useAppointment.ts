import { getAppointment } from "@/services/apiAppointments";
import { useQuery} from "@tanstack/react-query";

export function useAppointment(id:any){
  const {
      isLoading,
      data:appointment,
      error,
    } = useQuery({
      queryKey: ["appointment",id],
      queryFn:() => getAppointment({id}),
    });
    return {isLoading,appointment,error}
}