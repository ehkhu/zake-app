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
id: 2,
appointment_id: 1,
treatment_type: "filling",
treatment_date: "2023-12-20 10:38:11",
duration: 60,
notes: "Cavity filling",
charge_amount: "100000.00",
created_at: "2023-12-20T04:08:11.000000Z",
updated_at: "2023-12-20T04:08:11.000000Z"
*/

const colums = [
  "appointment id",
  "treatment type", 
  "treatment date",
  "duration",
  "notes",
  "amount",
  "",
];

export function TreatmentsTable({appointment_id=null}:any) {
  
  
  const { isLoading, treatments, error } = useTreatments(appointment_id);
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
                    <TableHead key={index} className={row=='amount'?"text-right":""}>
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
