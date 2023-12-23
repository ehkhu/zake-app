"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TreatmentsTable from "@/features/treatments/TreatmentsTable";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Dot, Mail, Map, Phone } from "lucide-react";
import { usePatient } from "./usePatient";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
export default function PatientDetail({ anPatientId }: any) {
  const patientId = anPatientId;
  const { isLoading, patient, error } = usePatient(patientId);

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
  if (isLoading) return "loading...";
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
            <h3 className="text-sm">{patient.data.name}</h3>
            <Separator className="my-3" />
            <div className="flex items-center space-x-4">
              <Phone className="w-4 h-4 text-muted-foreground" />{" "}
              <span>{patient.data.contact_number}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-4 h-4 text-muted-foreground" />{" "}
              <span>{patient.data.email}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Map className="w-4 h-4 text-muted-foreground" />{" "}
              <span>{patient.data.address}</span>
            </div>
          </CardContent>
          <CardFooter className="flex space-x-4 justify-end">
            {/* footer */}
          </CardFooter>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>{patient.data.name} activities</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-6 flex justify-between text-center content-center">
            <div className="-mx-2 grid justify-items-center p-2 w-1/3">
              {/* <BellIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-2">
                <p className="text-xl font-medium leading-none">
                  {patient.data.appointments_count}
                </p>
                <p className="text-sm text-muted-foreground">Appointment</p>
              </div>
            </div>

            <div className="-mx-2 grid justify-items-center space-x-4 p-2 w-1/3">
              {/* <PersonIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-2">
                <p className="text-xl font-medium leading-none">
                  {patient.data.total_treatment_records}
                </p>
                <p className="text-sm text-muted-foreground">Treatments</p>
              </div>
            </div>

            <div className="-mx-2 grid justify-items-center space-x-4 p-2 w-1/3">
              {/* <EyeNoneIcon className="mt-px h-5 w-5" /> */}
              <div className="space-y-2">
                <p className="text-xl font-medium leading-none">
                  {patient.data.total_charge_amount}
                </p>
                <p className="text-sm text-muted-foreground">Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Appointments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {patient.data.appointments.map((appointment: any) => (
              <li className="mb-10 ms-4" key={appointment.id}>
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {format(new Date(appointment.appointment_date), "Y-MMM-d")}
                </time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {appointment.dentist.name}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  <Table className="border-1 round-md">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Treatment Type</TableHead>
                        <TableHead>Treatment Date</TableHead>
                        <TableHead className="text-right">
                          Charge Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointment.treatment_records.map((record: any) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            {record.treatment_type}
                          </TableCell>
                          <TableCell>{record.treatment_date}</TableCell>
                          <TableCell className="text-right">
                            {record.charge_amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right">
                          {appointment.appointment_charge_amount}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </p>
              </li>
            ))}
          </ol>
        </CardContent>
        <CardFooter className="flex justify-between">{/* footer */}</CardFooter>
      </Card>
    </>
  );
}
