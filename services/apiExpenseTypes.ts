import axios from "axios";
export async function getExpenseTypes({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "http://dcms-backend.test/api/" + "expense_types",{
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
    "http://dcms-backend.test/api/" + "all_expense_types");
  return response.data;
}

export async function storeExpenseType(newExpenseType:any) {
  return axios.post("http://dcms-backend.test/api/" + "expense_types", newExpenseType)
}

export async function updateExpenseType(expenseType:any,id:number) {
  return axios.put("http://dcms-backend.test/api/" + "expense_types/"+id, expenseType)
}

export async function destoryExpenseType(id:number) {
  return axios.delete("http://dcms-backend.test/api/" + "expense_types/"+id)
}