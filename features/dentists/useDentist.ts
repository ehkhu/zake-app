

import { getDentist } from "@/services/apiDentists";
import { useQuery} from "@tanstack/react-query";

export function useDentist(id:any){
  const {
      isLoading,
      data:dentist,
      error,
    } = useQuery({
      queryKey: ["dentist",id],
      queryFn:() =>  getDentist({id}),
    });
    return {isLoading,dentist,error}
}