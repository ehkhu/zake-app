import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./sidebar-nav"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Patients",
    href: "/patients",
  },
  {
    title: "Dentists",
    href: "/dentists",
  },
  {
    title: "Treatments",
    href: "/treatments",
  },
  {
    title: "Cash-Books",
    href: "/cash-books",
  },
  {
    title: "Expenses",
    href: "/expenses",
  },
  {
    title: "Employees",
    href: "/employees",
  },
]

interface SidebarLayoutProps {
  children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
    </>
  )
}
