import React, { use } from "react";
import PatientsTable from '@/features/patients/PatientsTable'
import Search from "@/ui/Search";
import { AddPatient } from "@/features/AddPatient";

const Page =  async (params:any) => {
    return <>
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Patients</h2>
            <p className="text-muted-foreground">
              All patient lists is display here.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
        <AddPatient />
        <Search placeholder="Search Patients"></Search>
        </div>
        <PatientsTable></PatientsTable>
      </div>
      
      
    </>;
}

export default Page;