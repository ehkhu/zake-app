import { CreateTreatmentForm } from "@/features/treatments/CreateTreatmentForm";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
export default async function CreateTreatment(params:any) {
    return (
        <>
          <AdminLayout>
            <SidebarLayout>
              <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold tracking-tight">New Treatment</h2>
                </div>
                <CreateTreatmentForm></CreateTreatmentForm>    
              </div>
            </SidebarLayout>
          </AdminLayout>
        </>
      );
}