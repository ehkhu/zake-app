import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CreateAppointmentForm } from "./CreateAppointmentForm";
export function AddAppointment(){
    return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Appointment</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md"  style={{ maxWidth: 650}}>
        <DialogHeader>
          <DialogTitle>Add New</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <CreateAppointmentForm/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
    )
}