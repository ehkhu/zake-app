// import { getExpenseTypes } from "@/services/apiExpenseTypes";

import { getAllExpenseTypes } from "@/services/apiExpenseTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllExpenseTypes(){
  const {
      isLoading,
      data:allExpenseTypes,
      error,
    } = useQuery({
      queryKey: ["allExpenseTypes"],
      queryFn:getAllExpenseTypes,
    });
      return{isLoading,allExpenseTypes,error}
}