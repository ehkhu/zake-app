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
import { CreatePatientForm } from "./patients/CreatePatientForm";

export function AddPatient(){
    return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create New Patient</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md"  style={{ maxWidth: 650}}>
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <CreatePatientForm/>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
    )
}