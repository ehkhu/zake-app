'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppointment } from "@/features/appointments/useAppointment";
import TreatmentsTable from "@/features/treatments/TreatmentsTable";
import { AddTreatment } from "@/features/treatments/AddTreatment";
import { useUpdateAppointmentStatus } from "./useUpdateAppointmentStatus";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Mail, Map, Phone } from "lucide-react";
export default function AppointmentDetail({anAppointmentId}:any){
    const {updateAppointmentStatus,isUpdating} = useUpdateAppointmentStatus();
    const appointmentId = anAppointmentId;
  const {isLoading,appointment,error} = useAppointment(appointmentId);
function handelUpdateStatus(value:any){
    let newAppointment = {...appointment.data};
    newAppointment.status = value;
    delete newAppointment.patient;
    delete newAppointment.dentist;
    delete newAppointment.treatment_records;
    updateAppointmentStatus({appointment:newAppointment,id:anAppointmentId},{onSuccess:()=>{
    },
    onError: (err) => onError(err)
    });
}
function onError(errors: any) {
    if (errors.response && errors.response.status === 422) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.response.data.error.message,
      });
    } else {
      // Handle other types of errors
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.message,
      });
    }
  }
  if(isLoading) return "loading...";
    return (
        <>
        <div className="flex space-x-2">

        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Patient</CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent className=" space-y-4">
            {/* content */}
            <h3 className="text-sm">{appointment.data.patient.name}</h3>
            <Separator className="my-3"/>
            <div className="flex items-center space-x-4">
              <Phone className="w-4 h-4 text-muted-foreground"/> <span>{appointment.data.patient.contact_number}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-4 h-4 text-muted-foreground"/> <span>{appointment.data.patient.email}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Map className="w-4 h-4 text-muted-foreground"/> <span>{appointment.data.patient.address}</span>
            </div>
          </CardContent>
          <CardFooter className="flex space-x-4 justify-end">
            {/* footer */}
          </CardFooter>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Appointment</CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 text-sm">
              <div className="grid grid-cols-4 gap-4  ">
                <div className="text-muted-foreground">Date</div>
                <div className="col-span-3">{appointment.data.appointment_date}</div>
              </div>

              <div className="grid grid-cols-4  gap-4  ">
                <div className="text-muted-foreground">Patient</div>
                <div className="col-span-3">{appointment.data.patient.name}</div>
              </div>

              <div className="grid grid-cols-4 gap-4  ">
                <div className="text-muted-foreground">Dentist</div>
                <div className="col-span-3">{appointment.data.dentist.name}</div>
              </div>

              <div className="grid grid-cols-4 gap-4 ">
                <div className="text-muted-foreground">Status</div>
                <div className="col-span-3">{appointment.data.status}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex space-x-4 justify-end">
            {/* footer */}
            <Button onClick={()=>handelUpdateStatus('completed')}>Complete</Button>
            <Button onClick={()=>handelUpdateStatus('cancelled')} variant="destructive">Cancel</Button>
          </CardFooter>
        </Card>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Treatment Record</span>
            <AddTreatment appointment_id={appointmentId}></AddTreatment>
            </CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
            {/* treatment record */}
            <TreatmentsTable appointment_id={appointmentId}/>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* footer */}
          </CardFooter>
        </Card>
      
    </>

    )
}