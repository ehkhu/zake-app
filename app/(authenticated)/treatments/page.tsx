import React, { use } from "react";
import TreatmentsTable from "@/features/treatments/TreatmentsTable";
import Search from "@/ui/Search";
import { AddTreatment } from "@/features/treatments/AddTreatment";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import FilterByDays from "@/ui/matric-combobox";
import FilterOptions from "@/ui/filter-options";
import TableOperations from "@/ui/table-operations";

const Page = async (params: any) => {
  return (
    <>
          <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Treatments</h2>
              {/* <div className="">
                <Search placeholder="Search... "></Search>
              </div> */}
            </div>
            <div className="flex justify-between content-end">
            <Search placeholder="Search... "></Search>
              {/* <AddTreatment /> */}
              <TableOperations>
                <FilterOptions
                    filterField="in_days"
                    options={[
                      {value: "all",label: "Select Days...",},
                      {value: "1",label: "Today"},
                      {value: "5",label: "5 Days"},
                      {value: "10",label: "10 Days"},
                      {value: "30",label: "30 Days"},
                    ]}
                  />
                </TableOperations>
            </div>
            <TreatmentsTable/>
          </div>
    </>
  );
};

export default Page;
