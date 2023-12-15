import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";
import DashboardPage from "@/features/dashbaord/dashboard";

export default function Dashboard(){
    return (
        <>
        <AdminLayout>
      <SidebarLayout>
        <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
        <DashboardPage></DashboardPage>
        </div>
      </SidebarLayout>
    </AdminLayout>
    </>
    )
}