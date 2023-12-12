import axios from "axios";
export async function getPatients({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "http://dcms-backend.test/api/" + "patients",{
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

export async function storePatient(newPatient:any) {
  return axios.post("http://dcms-backend.test/api/" + "patients", newPatient)
}

export async function updatePatient(patient:any,id:number) {
  return axios.put("http://dcms-backend.test/api/" + "patients/"+id, patient)
}

export async function destoryPatient(id:number) {
  return axios.delete("http://dcms-backend.test/api/" + "patients/"+id)
}