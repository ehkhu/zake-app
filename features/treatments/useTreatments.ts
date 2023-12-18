import { getTreatments } from "@/services/apiTreatments";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useTreatments(){
  // const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  
  const search = !searchParams.get("q") ? "" : searchParams.get("q");
  
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // by days
  const in_days = !searchParams.get("in_days") ? 0 : Number(searchParams.get("in_days"));

  // PAGINATION
  const pageSize = !searchParams.get("pageSize") ? 10 : Number(searchParams.get("pageSize"));
  const {
      isLoading,
      data:treatments,
      error,
    } = useQuery({
      queryKey: ["treatments",search, sortBy, page, pageSize, in_days],
      queryFn:() => getTreatments({ search, sortBy, page, pageSize, in_days }),
    });
    
    /*
    // PRE-FETCHING
    let pageCount = 0
    if(treatments){
      pageCount = treatments.data.last_page//Math.ceil(total / pageSize); 
    }
    
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["treatments", search, sortBy, page + 1,pageSize],
      queryFn: () => getTreatments({ search, sortBy, page: page + 1,pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["treatments", search, sortBy, page - 1,pageSize],
      queryFn: () => getTreatments({ search, sortBy, page: page - 1,pageSize }),
    });
    */
      return{isLoading,treatments,error}
}