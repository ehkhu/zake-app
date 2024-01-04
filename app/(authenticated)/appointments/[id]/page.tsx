import AppointmentDetail from "@/features/appointments/AppointmentDetail";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <AppointmentDetail anAppointmentId={params.id}></AppointmentDetail>        
    </>
  );
}
