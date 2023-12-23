import { getRecentAppointments } from "@/services/apiOverviews";
import { useQuery} from "@tanstack/react-query";

export function useRecentAppointment(){
  const {
      isLoading,
      data:recentAppointment,
      error,
    } = useQuery({
      queryKey: ["recentAppointment"],
      queryFn: getRecentAppointments,
    });
      return{isLoading,recentAppointment,error}
}