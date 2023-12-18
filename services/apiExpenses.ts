import axios from "@/lib/axios";

export async function getExpenses({ search, sortBy, page, pageSize , in_days}:any) {
  const response = await axios.get(
    "/api/expenses",{
      params: { search,
        sortBy:sortBy.field, 
        direction:sortBy.direction, 
         page,
         pageSize,
         in_days
         }
    }
  );
  return response.data;
}

export async function storeExpense(newExpense:any) {
  return axios.post("/api/expenses", newExpense)
}

export async function updateExpense(expense:any,id:number) {
  return axios.put("/api/expenses/"+id, expense)
}

export async function destoryExpense(id:number) {
  return axios.delete("/api/expenses/"+id)
}

