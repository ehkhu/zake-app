"use client";
import React, { useEffect, useState } from "react";
import { useExpenses } from "./useExpenses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ExpenseRow } from "./ExpenseRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";


const colums = [
  "expense date",
  "expense on", // expense_type.name
  "notes",
  "amount",
  "",
];

export function ExpensesTable() {
  const { isLoading, expenses, error } = useExpenses();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!expenses) return <Empty resourceName="expenses" />;
  if (!expenses.data.data.length) return <Empty resourceName="expenses" />;
  if(expenses){
    counts = expenses.data.total;
  }

  function handelCheck(expenseId:number){
    if(Array.from(selectedIds).includes(expenseId)){
      removeExpenseId(expenseId)
    }else{
      addNewExpenseId(expenseId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    expenses.data.data.map((expense:any)=>{intArray.push(expense.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(expenses.data.data.map((expense:any) => expense.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new expenseId
  const addNewExpenseId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeExpenseId = (idToRemove:any) => {
    setSelectedIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.delete(idToRemove);
      return newIds;
    });
  };
    return (
      <>
          <div className="rounded-md border h-screen">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {/* for version 2
                    <Checkbox
                    checked={isSelectedAll}
                    onClick={handelCheckAll}
                    /> */}
                  </TableHead>
                  {colums.map((row, index) => (
                    <TableHead key={index}>
                      <span className="capitalize">{row}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TBody
                data={expenses.data.data}
                render={(expense:any) => (
                  <ExpenseRow key={expense.id} expense={expense} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={colums.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {expenses.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={expenses.data.current_page} 
                      next_page_url={expenses.data.next_page_url}
                      from = {expenses.data.from}
                      path={expenses.data.path}
                      per_page={expenses.data.per_page}
                      prev_page_url={expenses.data.prev_page_url}
                      to={expenses.data.to}
                      total={expenses.data.total}
                      last_page={expenses.data.last_page}
                      />
                  </div>
                    </TableCell>
                  </TableRow>
              </TableFooter>
            </Table>
          </div>
      </>
    );
}

function TBody({ data, render }:any) {
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="expenses" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default ExpensesTable;
