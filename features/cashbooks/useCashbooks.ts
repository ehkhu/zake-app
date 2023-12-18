
import { getCashbooks } from "@/services/apiCashbooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useCashbooks(){
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
  const in_days = !searchParams.get("in_days") ? 0 : Number(searchParams.get("in_days")!='all'?searchParams.get("in_days"):0);
  // transaction_type
  const transaction_type = !searchParams.get("transaction_type") ? '' : searchParams.get("transaction_type")!='all'?searchParams.get("transaction_type"):'';
  
  // PAGINATION
  const pageSize = !searchParams.get("pageSize") ? 10 : Number(searchParams.get("pageSize"));
  const {
      isLoading,
      data:cashbooks,
      error,
    } = useQuery({
      queryKey: ["cashbooks",search, sortBy, page, pageSize, in_days,transaction_type],
      queryFn:() => getCashbooks({ search, sortBy, page, pageSize, in_days,transaction_type }),
    });
    
    /*
    // PRE-FETCHING
    let pageCount = 0
    if(cashbooks){
      pageCount = cashbooks.data.last_page//Math.ceil(total / pageSize); 
    }
    
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["cashbooks", search, sortBy, page + 1,pageSize],
      queryFn: () => getCashbooks({ search, sortBy, page: page + 1,pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["cashbooks", search, sortBy, page - 1,pageSize],
      queryFn: () => getCashbooks({ search, sortBy, page: page - 1,pageSize }),
    });
    */
      return{isLoading,cashbooks,error}
}