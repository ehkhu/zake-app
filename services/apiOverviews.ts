import axios from "@/lib/axios";
export async function getOverviews({ search,in_days}:any) {
  const response = await axios.get(
    "/api/profit_and_loss",{
      params: { search,
         in_days
         }
    }
  );
  return response.data;
}

export async function getCountPatients({ search,in_days}:any) {
  const response = await axios.get(
    "/api/countPatients",{
      params: { search,
         in_days
         }
    }
  );
  return response.data;
}

export async function getMonthlyIncome() {
  const response = await axios.get(
    "/api/cashbookMonthlyData"
  );
  return response.data;
}

export async function getRecentAppointments() {
  const response = await axios.get(
    "/api/recent_appointments"
  );
  return response.data;
}

// export async function storeExpense(newExpense:any) {
//   return axios.post("/api/cash-book", newExpense)
// }

// export async function updateExpense(overview:any,id:number) {
//   return axios.put("/api/cash-book/"+id, overview)
// }

// export async function destoryExpense(id:number) {
//   return axios.delete("/api/cash-book/"+id)
// }