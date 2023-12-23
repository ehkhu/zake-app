
import { getPatient } from "@/services/apiPatients";
import { useQuery} from "@tanstack/react-query";

export function usePatient(id:any){
  const {
      isLoading,
      data:patient,
      error,
    } = useQuery({
      queryKey: ["patient",id],
      queryFn:() => getPatient({id}),
    });
    return {isLoading,patient,error}
}