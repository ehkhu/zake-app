import React, { use } from "react";
import PatientsTable from '@/features/patients/PatientsTable'
import Search from "@/ui/Search";
import { AddPatient } from "@/features/patients/AddPatient";
import { Button } from "@/components/ui/button";



const Page =  async (params:any) => {
    return <>
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
            <Search placeholder="Search Patients"></Search>
          </div>
        <div className="flex justify-between">
        <AddPatient />
        <Button variant="secondary">Export csv</Button>
        </div>
        <PatientsTable></PatientsTable>
    </>;
}

export default Page;