import axios from "@/lib/axios";

export async function getTreatments({ search, sortBy, page, pageSize , in_days, appointment_id}:any) {
  console.log("get Treatment", appointment_id);
  const response = await axios.get(
    "/api/treatments",{
      params: { search,
        sortBy:sortBy.field, 
        direction:sortBy.direction, 
         page,
         pageSize,
         in_days,
         appointment_id
         }
    }
  );
  return response.data;
}

export async function storeTreatment(newTreatment:any) {
  return axios.post("/api/treatments", newTreatment)
}

export async function updateTreatment(treatment:any,id:number) {
  return axios.put("/api/treatments/"+id, treatment)
}

export async function destoryTreatment(id:number) {
  return axios.delete("/api/treatments/"+id)
}