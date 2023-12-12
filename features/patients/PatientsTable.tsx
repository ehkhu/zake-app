"use client";
import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
// import { PatientsPagination } from "./PatientPagination";
import { Loading } from "@/ui/Loading";
import { Empty } from "@/ui/Empty";
import { Pagination } from "@/ui/Pagination";
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
  if (isLoading) return <Loading/>;
  if (error) return "Error";
  // if (!patients.data.data.length) return <Empty resourceName="patients" />;
    
    return (
      <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox></Checkbox>
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
            <PatientRow key={patient.id} patient={patient} />
          )}
        />
              {/* <TableBody>
                {patients.data.data.map((patient: any) => (
                  <PatientRow patient={patient} key={patient.id}></PatientRow>
                ))}
              </TableBody> */}
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={tHeads.length + 1}>
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
                      last_page={patients.data.last_page}/>
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
