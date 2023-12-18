import axios from "@/lib/axios";

export async function getTreatmentTypes({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "/api/treatment_types",{
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
    "/api/all_treatment_types");
  return response.data;
}

export async function storeTreatmentType(newTreatmentType:any) {
  return axios.post("/api/treatment_types", newTreatmentType)
}

export async function updateTreatmentType(treatmentType:any,id:number) {
  return axios.put("/api/treatment_types/"+id, treatmentType)
}

export async function destoryTreatmentType(id:number) {
  return axios.delete("/api/treatment_types/"+id)
}