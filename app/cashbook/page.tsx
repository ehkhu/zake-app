import React, { use } from "react";
import CashbooksTable from "@/features/cashbooks/CashbooksTable";
import Search from "@/ui/Search";
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
import TableOperations from "@/ui/table-operations";
const Page = async (params: any) => {
  return (
    <>
      <AdminLayout>
        <SidebarLayout>
          <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Cashbook</h2>
            </div>
              {/* table operations */}
              <div className="flex justify-between"> 
                <Search placeholder="Search... "></Search>
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
                  <FilterOptions
                    filterField="transaction_type"
                    options={[
                      { value: "all", label: "All" },
                      {value: "expense",label: "Expense"},
                      {value: "income",label: "Income"},
                    ]}
                  />
                </TableOperations>
              </div>
              {/* end table operations */}
            <CashbooksTable></CashbooksTable>
          </div>
        </SidebarLayout>
      </AdminLayout>
    </>
  );
};

export default Page;
