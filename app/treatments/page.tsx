import React, { use } from "react";
import TreatmentsTable from "@/features/treatments/TreatmentsTable";
import Search from "@/ui/Search";
import { AddTreatment } from "@/features/treatments/AddTreatment";
import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import { Button } from "@/components/ui/button";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import FilterByDays from "@/ui/matric-combobox";

const Page = async (params: any) => {
  return (
    <>
      <AdminLayout>
        <SidebarLayout>
          <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Treatments</h2>
              <div className="">
                <Search placeholder="Search... "></Search>
              </div>
            </div>
            <div className="flex justify-between">
              <AddTreatment />
              <FilterByDays></FilterByDays>
            </div>
            <TreatmentsTable/>
          </div>
        </SidebarLayout>
      </AdminLayout>
    </>
  );
};

export default Page;
