import axios from "@/lib/axios";
export async function getDentists({ search, sortBy, page, pageSize }:any) {
  const response = await axios.get(
    "/api/dentists",{
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
  return axios.post("/api/dentists", newDentist)
}

export async function updateDentist(dentist:any,id:number) {
  return axios.put("/api/dentists/"+id, dentist)
}

export async function destoryDentist(id:number) {
  return axios.delete("/api/dentists/"+id)
}