import axios from "axios";
export async function getDentists({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "http://dcms-backend.test/api/" + "dentists",{
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

export async function storeDentist(newDentist:any) {
  return axios.post("http://dcms-backend.test/api/" + "dentists", newDentist)
}

export async function updateDentist(dentist:any,id:number) {
  return axios.put("http://dcms-backend.test/api/" + "dentists/"+id, dentist)
}

export async function destoryDentist(id:number) {
  return axios.delete("http://dcms-backend.test/api/" + "dentists/"+id)
}