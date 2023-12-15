import React, { use } from "react";
import ExpensesTable from '@/features/expenses/ExpensesTable'
import Search from "@/ui/Search";
import { AddExpense } from "@/features/expenses/AddExpense";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import { Button } from "@/components/ui/button";
import { getExpensesData } from "@/services/apiExpenses";
const Page =  async (params:any) => {
  const data = await getExpensesData();   
  
    return <>
    <AdminLayout>
      <SidebarLayout>
        <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
            <div className="flex items-center space-x-2">
              <Search placeholder="Search... "></Search>
            </div>
          </div>
        <div className="flex justify-between">
        <AddExpense expList={data}/>
        <Button variant="secondary">Export csv</Button>
        </div>
        <ExpensesTable expList={data}></ExpensesTable>
      </div>
      </SidebarLayout>
    </AdminLayout>
    </>;
}

export default Page;