// import Navbar from './navbar'
// import Footer from './footer'

import Image from "next/image"
import TeamSwitcher from "../team-switcher"
import { MainNav } from "../main-nav"
import Search from "../Search"
import { UserNav } from "../user-nav"
 
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search placeholder="search"/> */}
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div> */}
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}