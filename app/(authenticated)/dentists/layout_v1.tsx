import AdminLayout from "@/ui/Layout/Admin";
import SidebarLayout from "@/ui/side-layout";

export default function layout({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <AdminLayout>
        <SidebarLayout>
          <div className="hidden h-full flex-1 flex-col space-y-4 px-2 md:flex">
            {children}
          </div>
        </SidebarLayout>
      </AdminLayout>
    )
}