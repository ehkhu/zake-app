import { getCountPatients } from "@/services/apiOverviews";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useCountPatients(){
  // const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  
  const search = !searchParams.get("q") ? "" : searchParams.get("q");
  // by days
  const in_days = !searchParams.get("in_days") ? 0 : Number(searchParams.get("in_days"));

  
  const {
      isLoading,
      data:countPatients,
      error,
    } = useQuery({
      queryKey: ["countPatients",search,in_days],
      queryFn:() => getCountPatients({ search, in_days }),
    });
      return{isLoading,countPatients,error}
}