import { CreateTreatmentForm } from "@/features/treatments/CreateTreatmentForm";
import { getTreatmentsData } from "@/services/apiTreatments";

export default async function CreateTreatment(params:any) {
  const data = await getTreatmentsData();   
    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Add Treatment</h2>
            <p className="text-muted-foreground">
              Create a treatment
            </p>
          </div>
        </div>
        <div className="w-[850px] m-0">
          <CreateTreatmentForm treatmentsValues={data.data}></CreateTreatmentForm>    
        </div>
      </div>
    )
    
}