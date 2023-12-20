import axios from "@/lib/axios";

export async function getAppointments({ search, sortBy, page, pageSize , in_days,status}:any) {
  const response = await axios.get(
    "/api/appointments",{
      params: { search,
        sortBy:sortBy.field, 
        direction:sortBy.direction, 
        page,
        pageSize,
        in_days,
        status
        }
    }
  );
  return response.data;
}
export async function getAppointment({id}:any) {
  const response = await axios.get(
    "/api/appointments/"+id);
  return response.data;
}

export async function storeAppointment(newAppointment:any) {
  return axios.post("/api/appointments", newAppointment)
}

export async function updateAppointment(appointment:any,id:number) {
  return axios.put("/api/appointments/"+id, appointment)
}

export async function destoryAppointment(id:number) {
  return axios.delete("/api/appointments/"+id)
}