import axios from "@/lib/axios";

export async function getExpenseTypes({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "/api/expense_types",{
      params: { search,
        sortBy:sortBy.field, 
        direction:sortBy.direction, 
         page,
         pageSize
         }
    }
  );
  return response.data;
}

export async function getAllExpenseTypes() {
  const response = await axios.get(
    "/api/all_expense_types");
  return response.data;
}

export async function storeExpenseType(newExpenseType:any) {
  return axios.post("/api/expense_types", newExpenseType)
}

export async function updateExpenseType(expenseType:any,id:number) {
  return axios.put("/api/expense_types/"+id, expenseType)
}

export async function destoryExpenseType(id:number) {
  return axios.delete("/api/expense_types/"+id)
}