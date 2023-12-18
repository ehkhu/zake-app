import axios from "@/lib/axios";
export async function getCashbooks({ search, sortBy, page, pageSize , in_days, transaction_type}:any) {
  const response = await axios.get(
    "/api/cash-book",{
      params: { search,
        sortBy:sortBy.field, 
        direction:sortBy.direction, 
         page,
         pageSize,
         in_days,
         transaction_type
         }
    }
  );
  return response.data;
}

export async function storeExpense(newExpense:any) {
  return axios.post("/api/cash-book", newExpense)
}

export async function updateExpense(cashbook:any,id:number) {
  return axios.put("/api/cash-book/"+id, cashbook)
}

export async function destoryExpense(id:number) {
  return axios.delete("/api/cash-book/"+id)
}