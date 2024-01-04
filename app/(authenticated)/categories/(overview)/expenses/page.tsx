import React, { use } from "react";
import ExpenseTypesTable from "@/features/expenseTypes/ExpenseTypesTable";
import Search from "@/ui/Search";
import { AddExpenseType } from "@/features/expenseTypes/AddExpenseType";
import { Button } from "@/components/ui/button";

const Page = async (params: any) => {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Expense Categories
          </h2>
          <div className="flex items-center space-x-2">
            <Search placeholder="Search... "></Search>
          </div>
        </div>
        <div className="flex justify-between">
          <AddExpenseType />
          <Button variant="secondary">Export csv</Button>
        </div>
        <ExpenseTypesTable></ExpenseTypesTable>
      </div>
    </>
  );
};

export default Page;
