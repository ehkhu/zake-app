// import { getExpenseTypes } from "@/services/apiExpenseTypes";
import { getExpenseTypes } from "@/services/apiExpenseTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useExpenseTypes(){
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  
  const search = !searchParams.get("q") ? "" : searchParams.get("q");
  
  // SORT
  const sortByRaw = searchParams.get("sortBy") || "name-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // PAGINATION
  const pageSize = !searchParams.get("pageSize") ? 10 : Number(searchParams.get("pageSize"));
  const {
      isLoading,
      data:expenseTypes,
      error,
    } = useQuery({
      queryKey: ["expenseTypes",search, sortBy, page,pageSize],
      queryFn:() => getExpenseTypes({ search, sortBy, page, pageSize }),
    });
    
    /*
    // PRE-FETCHING
    let pageCount = 0
    if(expenseTypes){
      pageCount = expenseTypes.data.last_page//Math.ceil(total / pageSize); 
    }
    
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["expenseTypes", search, sortBy, page + 1,pageSize],
      queryFn: () => getExpenseTypes({ search, sortBy, page: page + 1,pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["expenseTypes", search, sortBy, page - 1,pageSize],
      queryFn: () => getExpenseTypes({ search, sortBy, page: page - 1,pageSize }),
    });
    */
      return{isLoading,expenseTypes,error}
}