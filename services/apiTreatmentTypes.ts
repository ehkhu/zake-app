import axios from "@/lib/axios";

export async function getTreatmentTypes({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "/api/treatment_charges",{
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

export async function getAllTreatmentTypes() {
  const response = await axios.get(
    "/api/all_treatment_charges");
  return response.data;
}

export async function storeTreatmentType(newTreatmentType:any) {
  return axios.post("/api/treatment_charges", newTreatmentType)
}

export async function updateTreatmentType(treatmentType:any,id:number) {
  return axios.put("/api/treatment_charges/"+id, treatmentType)
}

export async function destoryTreatmentType(id:number) {
  return axios.delete("/api/treatment_charges/"+id)
}