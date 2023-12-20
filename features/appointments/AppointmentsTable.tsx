"use client";
import React, { useEffect, useState } from "react";
import { useAppointments } from "./useAppointments";
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

import { AppointmentRow } from "./AppointmentRow";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
import { LoadingTable } from "@/ui/LoadingTable";


const colums = [
    'appointment date',
    'patient',
    'dentist',
    'notes',
    'status', //'scheduled, cancelled, completed'
    "",
];

export function AppointmentsTable() {
  const { isLoading, appointments, error } = useAppointments();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSelectedAll,setIsSelectedAll] = useState(false);
  let counts;

  if (isLoading) return <LoadingTable/>;
  if (error) return "Data Fatching Error";
  if (!appointments) return <Empty resourceName="appointments" />;
  if (!appointments.data.data.length) return <Empty resourceName="appointments" />;
  if(appointments){
    counts = appointments.data.total;
  }

  function handelCheck(appointmentId:number){
    if(Array.from(selectedIds).includes(appointmentId)){
      removeAppointmentId(appointmentId)
    }else{
      addNewAppointmentId(appointmentId);
    }
  }
  //this functon is for version 2
  function isAllSelected(){
    const intArray:any = [];
    appointments.data.data.map((appointment:any)=>{intArray.push(appointment.id)});
    if(intArray.length){
      const containsAllIntegers = intArray.every((number:number) => selectedIds.has(number));
      setIsSelectedAll(containsAllIntegers);
    }
  }
  
  //this is for version 2
  function handelCheckAll(){
      // const idsSet = new Set(appointments.data.data.map((appointment:any) => appointment.id));
      // setSelectedIds(idsSet);
  }

  const clearselectedIds = () => {
    setSelectedIds(new Set());
  };

  // add a new appointmentId
  const addNewAppointmentId = (newId:any) => {
    setSelectedIds((prevIds:any) => new Set([...prevIds, newId]));
  };

  const removeAppointmentId = (idToRemove:any) => {
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
                data={appointments.data.data}
                render={(appointment:any) => (
                  <AppointmentRow key={appointment.id} appointment={appointment} selectedIds={selectedIds} onHandlecheck={handelCheck}/>
                )}
              />
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={colums.length + 1}>
                    <div className="flex items-center justify-between">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {selectedIds.size} of {appointments.data.total} row(s) selected.
                  </div> 
                    <Pagination 
                      isLoading = {isLoading}
                      current_page ={appointments.data.current_page} 
                      next_page_url={appointments.data.next_page_url}
                      from = {appointments.data.from}
                      path={appointments.data.path}
                      per_page={appointments.data.per_page}
                      prev_page_url={appointments.data.prev_page_url}
                      to={appointments.data.to}
                      total={appointments.data.total}
                      last_page={appointments.data.last_page}
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
  if (!data.length) return <TableBody><TableRow><TableCell><Empty resourceName="appointments" /></TableCell></TableRow></TableBody>;
  return <TableBody>{data.map(render)}</TableBody>;
}
export default AppointmentsTable;
