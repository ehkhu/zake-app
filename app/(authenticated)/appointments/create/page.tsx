import { CreateAppointmentForm } from "@/features/appointments/CreateAppointmentForm";


export default async function CreateAppointment(params:any) {
    return (
      <>
        <div className="w-[550px] m-0">
            <h2 className="text-2xl font-bold tracking-tight">Add Appointment</h2>
            <CreateAppointmentForm></CreateAppointmentForm>    
        </div>
      </>
    )
    
}