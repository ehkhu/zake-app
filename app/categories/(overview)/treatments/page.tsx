import React, { use } from "react";
import TreatmentTypesTable from '@/features/treatmentTypes/TreatmentTypesTable'
import Search from "@/ui/Search";
import { AddTreatmentType } from "@/features/treatmentTypes/AddTreatmentType";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import { Button } from "@/components/ui/button";



const Page =  async (params:any) => {
    return <>
    <AdminLayout>
      <SidebarLayout>
        <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Treatment Categories</h2>
            <div className="flex items-center space-x-2">
              <Search placeholder="Search... "></Search>
            </div>
          </div>
        <div className="flex justify-between">
        <AddTreatmentType />
        <Button variant="secondary">Export csv</Button>
        </div>
        <TreatmentTypesTable></TreatmentTypesTable>
      </div>
      </SidebarLayout>
    </AdminLayout>
    </>;
}

export default Page;