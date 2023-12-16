import axios from "axios";
export async function getExpenses({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "http://dcms-backend.test/api/" + "expenses",{
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

export async function storeExpense(newExpense:any) {
  return axios.post("http://dcms-backend.test/api/" + "expenses", newExpense)
}

export async function updateExpense(expense:any,id:number) {
  return axios.put("http://dcms-backend.test/api/" + "expenses/"+id, expense)
}

export async function destoryExpense(id:number) {
  return axios.delete("http://dcms-backend.test/api/" + "expenses/"+id)
}

export async function getExpensesData() {
  const res = await fetch('http://dcms-backend.test/api/all_expense_types')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}