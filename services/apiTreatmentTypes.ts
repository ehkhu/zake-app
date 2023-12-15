import axios from "axios";
export async function getTreatmentTypes({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "http://dcms-backend.test/api/" + "treatment_types",{
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

export async function storeTreatmentType(newTreatmentType:any) {
  return axios.post("http://dcms-backend.test/api/" + "treatment_types", newTreatmentType)
}

export async function updateTreatmentType(treatmentType:any,id:number) {
  return axios.put("http://dcms-backend.test/api/" + "treatment_types/"+id, treatmentType)
}

export async function destoryTreatmentType(id:number) {
  return axios.delete("http://dcms-backend.test/api/" + "treatment_types/"+id)
}