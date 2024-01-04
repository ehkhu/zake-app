import React, { use } from "react";
import ExpensesTable from "@/features/expenses/ExpensesTable";
import Search from "@/ui/Search";
import { AddExpense } from "@/features/expenses/AddExpense";
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
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <div className="">
            <Search placeholder="Search... "></Search>
          </div>
        </div>
        <div className="flex justify-between">
          <AddExpense />
          <TableOperations>
            <FilterOptions
              filterField="in_days"
              options={[
                { value: "all", label: "Select Days..." },
                { value: "1", label: "Today" },
                { value: "5", label: "5 Days" },
                { value: "10", label: "10 Days" },
                { value: "30", label: "30 Days" },
              ]}
            />
          </TableOperations>
        </div>
        <ExpensesTable />
      </div>
    </>
  );
};

export default Page;
