"use client";
import React, { useEffect, useState } from "react";

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

import { CashbookRow } from "./CashbookRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";
import { useCashbooks } from "./useCashbooks";


const columns = [
  "transaction_date",
  "transaction_type",
  "description",
  "amount",
];

export function CashbooksTable() {
  const { isLoading, cashbooks, error } = useCashbooks();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!cashbooks) return <Empty resourceName="cashbooks" />;
  if (!cashbooks.data.data.length) return <Empty resourceName="cashbooks" />;
  if(cashbooks){
    counts = cashbooks.data.total;
  }

  function handelCheck(cashbookId:number){
    if(Array.from(selectedIds).includes(cashbookId)){
      removeCashbookId(cashbookId)
    }else{
      addNewCashbookId(cashbookId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    cashbooks.data.data.map((cashbook:any)=>{intArray.push(cashbook.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(cashbooks.data.data.map((cashbook:any) => cashbook.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new cashbookId
  const addNewCashbookId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeCashbookId = (idToRemove:any) => {
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
                  {columns.map((row, index) => (
                    <TableHead key={index} className={row=='amount'?"text-right":""}>
                      <span className="capitalize">{row}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TBody
                data={cashbooks.data.data}
                render={(cashbook:any) => (
                  <CashbookRow key={cashbook.id} cashbook={cashbook} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {cashbooks.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={cashbooks.data.current_page} 
                      next_page_url={cashbooks.data.next_page_url}
                      from = {cashbooks.data.from}
                      path={cashbooks.data.path}
                      per_page={cashbooks.data.per_page}
                      prev_page_url={cashbooks.data.prev_page_url}
                      to={cashbooks.data.to}
                      total={cashbooks.data.total}
                      last_page={cashbooks.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="cashbooks" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default CashbooksTable;
