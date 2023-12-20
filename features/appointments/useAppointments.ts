import { getAppointments } from "@/services/apiAppointments";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams} from 'next/navigation';

export function useAppointments(){
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

  // status
  const status = !searchParams.get("status") ? '' : searchParams.get("status")!='all'?searchParams.get("status"):'';

  // PAGINATION
  const pageSize = !searchParams.get("pageSize") ? 10 : Number(searchParams.get("pageSize"));
  const {
      isLoading,
      data:appointments,
      error,
    } = useQuery({
      queryKey: ["appointments",search, sortBy, page, pageSize, in_days,status],
      queryFn:() => getAppointments({ search, sortBy, page, pageSize, in_days, status }),
    });
    
    /*
    // PRE-FETCHING
    let pageCount = 0
    if(appointments){
      pageCount = appointments.data.last_page//Math.ceil(total / pageSize); 
    }
    
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["appointments", search, sortBy, page + 1,pageSize],
      queryFn: () => getAppointments({ search, sortBy, page: page + 1,pageSize }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["appointments", search, sortBy, page - 1,pageSize],
      queryFn: () => getAppointments({ search, sortBy, page: page - 1,pageSize }),
    });
    */
      return{isLoading,appointments,error}
}