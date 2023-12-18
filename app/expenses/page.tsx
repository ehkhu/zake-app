import React, { use } from "react";
import ExpensesTable from "@/features/expenses/ExpensesTable";
import Search from "@/ui/Search";
import { AddExpense } from "@/features/expenses/AddExpense";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import FilterByDays from "@/ui/matric-combobox";


const Page = async (params: any) => {
  return (
    <>
      <AdminLayout>
        <SidebarLayout>
          <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
              <div className="">
                <Search placeholder="Search... "></Search>
              </div>
            </div>
            <div className="flex justify-between">
              <AddExpense />
              <FilterByDays></FilterByDays>
            </div>
            <ExpensesTable/>
          </div>
        </SidebarLayout>
      </AdminLayout>
    </>
  );
};

export default Page;
