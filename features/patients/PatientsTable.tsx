"use client";
import React, { useEffect, useState } from "react";
import { usePatients } from "./usePatients";
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

import { PatientRow } from "./PatientRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";
import Error from "@/ui/error";

const tHeads = [
  "name",
  "date of birth",
  "contact number",
  "email",
  "",
  // "address",
  // "medical history",
];

export function PatientsTable() {
  const { isLoading, patients, error } = usePatients();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!patients) return <Empty resourceName="patients" />;
  if (!patients.data.data.length) return <Empty resourceName="patients" />;
  if(patients){
    counts = patients.data.total;
  }

  function handelCheck(patientId:number){
    if(Array.from(selectedIds).includes(patientId)){
      removePatientId(patientId)
    }else{
      addNewPatientId(patientId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    patients.data.data.map((patient:any)=>{intArray.push(patient.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(patients.data.data.map((patient:any) => patient.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new patientId
  const addNewPatientId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removePatientId = (idToRemove:any) => {
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
                data={patients.data.data}
                render={(patient:any) => (
                  <PatientRow key={patient.id} patient={patient} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={tHeads.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {patients.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={patients.data.current_page} 
                      next_page_url={patients.data.next_page_url}
                      from = {patients.data.from}
                      path={patients.data.path}
                      per_page={patients.data.per_page}
                      prev_page_url={patients.data.prev_page_url}
                      to={patients.data.to}
                      total={patients.data.total}
                      last_page={patients.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="patients" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default PatientsTable;
