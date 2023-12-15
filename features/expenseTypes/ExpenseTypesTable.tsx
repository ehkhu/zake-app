"use client";
import React, { useEffect, useState } from "react";
import { useExpenseTypes } from "./useExpenseTypes";
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

import { ExpenseTypeRow } from "./ExpenseTypeRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";


const tHeads = [
  "name",
  // "default cost",
  "",
];

export function ExpenseTypesTable() {
  const { isLoading, expenseTypes, error } = useExpenseTypes();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!expenseTypes) return <Empty resourceName="expenseTypes" />;
  if (!expenseTypes.data.data.length) return <Empty resourceName="expenseTypes" />;
  if(expenseTypes){
    counts = expenseTypes.data.total;
  }

  function handelCheck(expenseTypeId:number){
    if(Array.from(selectedIds).includes(expenseTypeId)){
      removeExpenseTypeId(expenseTypeId)
    }else{
      addNewExpenseTypeId(expenseTypeId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    expenseTypes.data.data.map((expenseType:any)=>{intArray.push(expenseType.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(expenseTypes.data.data.map((expenseType:any) => expenseType.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new expenseTypeId
  const addNewExpenseTypeId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeExpenseTypeId = (idToRemove:any) => {
    setSelectedIds((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.delete(idToRemove);
      return newIds;
    });
  };
    return (
      <>
          <div className="rounded-md border">
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
                  {tHeads.map((row, index) => (
                    <TableHead key={index}>
                      <span className="capitalize">{row}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TBody
                data={expenseTypes.data.data}
                render={(expenseType:any) => (
                  <ExpenseTypeRow key={expenseType.id} expenseType={expenseType} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={tHeads.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {expenseTypes.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={expenseTypes.data.current_page} 
                      next_page_url={expenseTypes.data.next_page_url}
                      from = {expenseTypes.data.from}
                      path={expenseTypes.data.path}
                      per_page={expenseTypes.data.per_page}
                      prev_page_url={expenseTypes.data.prev_page_url}
                      to={expenseTypes.data.to}
                      total={expenseTypes.data.total}
                      last_page={expenseTypes.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="expenseTypes" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default ExpenseTypesTable;
