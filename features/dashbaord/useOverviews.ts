import { getOverviews } from "@/services/apiOverviews";
import { useQuery} from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useOverviews(){
  const searchParams = useSearchParams();
  
  const search = !searchParams.get("q") ? "" : searchParams.get("q");
  // by days
  const in_days = !searchParams.get("in_days") ? 0 : Number(searchParams.get("in_days"));

  
  const {
      isLoading,
      data:overview,
      error,
    } = useQuery({
      queryKey: ["overview",search,in_days],
      queryFn:() => getOverviews({ search, in_days }),
    });
      return{isLoading,overview,error}
}