import axios from "@/lib/axios";

export async function getPatients({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "/api/patients",{
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

export async function getAllPatients() {
  const response = await axios.get(
    "/api/all_patients");
  return response.data;
}

export async function storePatient(newPatient:any) {
  return axios.post("/api/patients", newPatient)
}

export async function updatePatient(patient:any,id:number) {
  return axios.put("/api/patients/"+id, patient)
}

export async function destoryPatient(id:number) {
  return axios.delete("/api/patients/"+id)
}