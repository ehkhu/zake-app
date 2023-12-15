"use client";
import React, { useState } from "react";
import { useDentists } from "./useDentists";
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

import { DentistRow } from "./DentistRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";
import Error from "@/ui/error";

const tHeads = [
  "name",
  "contact number",
  "email",
  "specialization",
  "",
  // "address",
  // "medical history",
];

export function DentistsTable() {
  const { isLoading, dentists, error } = useDentists();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!dentists) return <Empty resourceName="dentists" />;
  if (!dentists.data.data.length) return <Empty resourceName="dentists" />;
  if(dentists){
    counts = dentists.data.total;
  }

  function handelCheck(dentistId:number){
    if(Array.from(selectedIds).includes(dentistId)){
      removeDentistId(dentistId)
    }else{
      addNewDentistId(dentistId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    dentists.data.data.map((dentist:any)=>{intArray.push(dentist.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(dentists.data.data.map((dentist:any) => dentist.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new dentistId
  const addNewDentistId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeDentistId = (idToRemove:any) => {
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
                data={dentists.data.data}
                render={(dentist:any) => (
                  <DentistRow key={dentist.id} dentist={dentist} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={tHeads.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {dentists.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={dentists.data.current_page} 
                      next_page_url={dentists.data.next_page_url}
                      from = {dentists.data.from}
                      path={dentists.data.path}
                      per_page={dentists.data.per_page}
                      prev_page_url={dentists.data.prev_page_url}
                      to={dentists.data.to}
                      total={dentists.data.total}
                      last_page={dentists.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="dentists" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default DentistsTable;
