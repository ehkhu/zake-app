import { getMonthlyIncome, getOverviews } from "@/services/apiOverviews";
import { useQuery} from "@tanstack/react-query";

export function useMonthlyonthIncome(){
  const {
      isLoading,
      data:monthlyIncome,
      error,
    } = useQuery({
      queryKey: ["monthlyIncome"],
      queryFn: getMonthlyIncome,
    });
      return{isLoading,monthlyIncome,error}
}