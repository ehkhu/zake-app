import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateAppointmentForm } from "./CreateAppointmentForm";
import { useState } from "react";
import { useDeleteAppointment } from "./useDeleteAppointment";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

/*
"appointment date",
  "appointment on", // appointment_type.name
  "notes",
  "amount",
  
*/
export function AppointmentRow({ appointment,selectedIds,onHandlecheck }: any) {
  
  const { toast } = useToast();
  const [openDelete, setOpenDelete] = useState(false);
  const [idToDelete, setidToDelete] = useState();
  const {
    id,
    appointment_date,
    notes,
    status
  } = appointment;
  const {deleteAppointment,isDeleting} = useDeleteAppointment();
  const handleDelete = (appointmentId:any)=>{
    deleteAppointment(appointmentId,{onSuccess:()=>{
      //on succcess
    },
    onError: (err) => onError(err)
    })
  }
  function onError(errors: any) {
      // Handle other types of errors
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.message,
      });
  }
  
  return (
    <TableRow>
      <TableCell className="py-2">
        <Checkbox
        checked={Array.from(selectedIds).includes(id)}
        onCheckedChange={()=>onHandlecheck(id)}
        />
      </TableCell>
      <TableCell className="py-2">{appointment_date}</TableCell>
      <TableCell className="py-2">{appointment.patient.name}</TableCell>
      <TableCell className="py-2">{appointment.dentist.name}</TableCell>
      <TableCell className="py-2">{notes}</TableCell>
      <TableCell className="py-2"><Badge className={status=='completed'?"bg-green-600 text-white":""} variant={status=='cancelled'?"destructive":"default"}>{status}</Badge></TableCell>
      {/* //'scheduled, cancelled, completed' */}
      <TableCell className="py-2">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>
                <Link href={`/appointments/${id}`}>
                  View Detail
                </Link>
                </DropdownMenuItem>
              <DropdownMenuItem>
                <DialogTrigger asChild>
                  <span className="w-full">
                    Edit
                  </span>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <span onClick={()=>{setOpenDelete(true);setidToDelete(id);}}>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-md" style={{ maxWidth: 650 }}>
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <CreateAppointmentForm appointmentToEdit={appointment} />
                
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </TableCell>
      {/* <TableCell className="py-2">{address}</TableCell> */}
      {/* <TableCell className="py-2">{medical_history}</TableCell> */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              appointment record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            asChild>
            <Button onClick={()=>{handleDelete(idToDelete)}}>Yes, delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableRow>
  );
}
