"use client";
import React, { useEffect, useState } from "react";
import { useTreatments } from "./useTreatments";
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

import { TreatmentRow } from "./TreatmentRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";

/*
id: 90,
patient_id: 280,
dentist_id: 180,
treatment_date: "2023-12-17",
procedure_description: null,
total_cost: "61.34",
notes: null,
*/

const colums = [
  "treatment date",
  "patient", 
  "dentist",
  "procedure description",
  "total cost",
  "",
];

export function TreatmentsTable() {
  const { isLoading, treatments, error } = useTreatments();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!treatments) return <Empty resourceName="treatments" />;
  if (!treatments.data.data.length) return <Empty resourceName="treatments" />;
  if(treatments){
    counts = treatments.data.total;
  }

  function handelCheck(treatmentId:number){
    if(Array.from(selectedIds).includes(treatmentId)){
      removeTreatmentId(treatmentId)
    }else{
      addNewTreatmentId(treatmentId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    treatments.data.data.map((treatment:any)=>{intArray.push(treatment.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(treatments.data.data.map((treatment:any) => treatment.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new treatmentId
  const addNewTreatmentId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeTreatmentId = (idToRemove:any) => {
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
                  {colums.map((row, index) => (
                    <TableHead key={index}>
                      <span className="capitalize">{row}</span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TBody
                data={treatments.data.data}
                render={(treatment:any) => (
                  <TreatmentRow key={treatment.id} treatment={treatment} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={colums.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {treatments.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={treatments.data.current_page} 
                      next_page_url={treatments.data.next_page_url}
                      from = {treatments.data.from}
                      path={treatments.data.path}
                      per_page={treatments.data.per_page}
                      prev_page_url={treatments.data.prev_page_url}
                      to={treatments.data.to}
                      total={treatments.data.total}
                      last_page={treatments.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="treatments" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default TreatmentsTable;
