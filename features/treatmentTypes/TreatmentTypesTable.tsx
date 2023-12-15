"use client";
import React, { useEffect, useState } from "react";
import { useTreatmentTypes } from "./useTreatmentTypes";
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

import { TreatmentTypeRow } from "./TreatmentTypeRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";
import Error from "@/ui/error";

const tHeads = [
  "name",
  "default_cost",
  "",
];

export function TreatmentTypesTable() {
  const { isLoading, treatmentTypes, error } = useTreatmentTypes();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!treatmentTypes) return <Empty resourceName="treatmentTypes" />;
  if (!treatmentTypes.data.data.length) return <Empty resourceName="treatmentTypes" />;
  if(treatmentTypes){
    counts = treatmentTypes.data.total;
  }

  function handelCheck(treatmentTypeId:number){
    if(Array.from(selectedIds).includes(treatmentTypeId)){
      removeTreatmentTypeId(treatmentTypeId)
    }else{
      addNewTreatmentTypeId(treatmentTypeId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    treatmentTypes.data.data.map((treatmentType:any)=>{intArray.push(treatmentType.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(treatmentTypes.data.data.map((treatmentType:any) => treatmentType.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new treatmentTypeId
  const addNewTreatmentTypeId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeTreatmentTypeId = (idToRemove:any) => {
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
                data={treatmentTypes.data.data}
                render={(treatmentType:any) => (
                  <TreatmentTypeRow key={treatmentType.id} treatmentType={treatmentType} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={tHeads.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {treatmentTypes.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={treatmentTypes.data.current_page} 
                      next_page_url={treatmentTypes.data.next_page_url}
                      from = {treatmentTypes.data.from}
                      path={treatmentTypes.data.path}
                      per_page={treatmentTypes.data.per_page}
                      prev_page_url={treatmentTypes.data.prev_page_url}
                      to={treatmentTypes.data.to}
                      total={treatmentTypes.data.total}
                      last_page={treatmentTypes.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="treatmentTypes" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default TreatmentTypesTable;
