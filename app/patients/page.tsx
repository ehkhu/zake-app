import React, { use } from "react";
import PatientsTable from '@/features/patients/PatientsTable'
import Search from "@/ui/Search";
import { AddPatient } from "@/features/AddPatient";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import { Button } from "@/components/ui/button";



const Page =  async (params:any) => {
    return <>
    <AdminLayout>
      <SidebarLayout>
        <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
            <div className="flex items-center space-x-2">
              <Search placeholder="Search Patients"></Search>
            </div>
          </div>
        <div className="flex justify-between">
        <AddPatient />
        <Button variant="secondary">Export CVS</Button>
        </div>
        <PatientsTable></PatientsTable>
      </div>
      </SidebarLayout>
    </AdminLayout>
    </>;
}

export default Page;