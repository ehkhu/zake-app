import { getExpenses } from "@/services/apiExpenses";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useExpenses(){
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  
  const search = !searchParams.get("q") ? "" : searchParams.get("q");
  
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "id-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // PAGINATION
  const pageSize = !searchParams.get("pageSize") ? 10 : Number(searchParams.get("pageSize"));
  const {
      isLoading,
      data:expenses,
      error,
    } = useQuery({
      queryKey: ["expenses",search, sortBy, page,pageSize],
      queryFn:() => getExpenses({ search, sortBy, page, pageSize }),
    });
    
    /*
    // PRE-FETCHING
    let pageCount = 0
    if(expenses){
      pageCount = expenses.data.last_page//Math.ceil(total / pageSize); 
    }
    
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["expenses", search, sortBy, page + 1,pageSize],
      queryFn: () => getExpenses({ search, sortBy, page: page + 1,pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["expenses", search, sortBy, page - 1,pageSize],
      queryFn: () => getExpenses({ search, sortBy, page: page - 1,pageSize }),
    });
    */
      return{isLoading,expenses,error}
}