import React, { use } from "react";
import DentistsTable from '@/features/dentists/DentistsTable'
import Search from "@/ui/Search";
import { Button } from "@/components/ui/button";
import { AddDentist } from "@/features/dentists/AddDentist";



const Page =  async (params:any) => {
    return <>
    
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dentists</h2>
            <div className="flex items-center space-x-2">
              <Search placeholder="Search Dentists"></Search>
            </div>
          </div>
        <div className="flex justify-between">
        <AddDentist />
        <Button variant="secondary">Export csv</Button>
        </div>
        <DentistsTable></DentistsTable>
    </>;
}

export default Page;