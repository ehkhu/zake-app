import React, { use } from "react";
import AppointmentsTable from "@/features/appointments/AppointmentsTable";
import Search from "@/ui/Search";
import { AddAppointment } from "@/features/appointments/AddAppointment";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import FilterOptions from "@/ui/filter-options";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";


const Page = async (params: any) => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
      <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
              <div className="">
                <Search placeholder="Search... "></Search>
              </div>
            </div>
            <div className="flex justify-between">
              <AddAppointment />
              {/* table operations */}
              <div className="flex justify-between"> 
                
                <Popover>
                  <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                      <Filter className="w-4 h-4"></Filter>
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px]">
                  <div className="flex flex-col space-y-4 content-center">
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
                  <FilterOptions
                    filterField="status"
                    options={[
                      { value: "all", label: "All" },
                      {value: "scheduled",label: "Scheduled"},
                      {value: "cancelled",label: "Cancelled"},
                      {value: "completed",label: "Completed"}
                    ]}
                  />
                </div>
                  </PopoverContent>
                </Popover>
              </div>
              {/* end table operations */}
            </div>
            <AppointmentsTable/>
    </div>
  );
};

export default Page;
