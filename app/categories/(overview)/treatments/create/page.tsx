import { CreateTreatmentTypeForm } from "@/features/treatmentTypes/CreateTreatmentTypeForm";

export default function CreateTreatmentType(params:any) {
    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add TreatmentType</h2>
            <p className="text-muted-foreground">
              Create a treatmentType
            </p>
          </div>
        </div>
        <div className="w-[850px] m-0">
          <CreateTreatmentTypeForm></CreateTreatmentTypeForm>    
        </div>
      </div>
    )
    
}