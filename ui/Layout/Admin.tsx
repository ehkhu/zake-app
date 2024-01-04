// import Navbar from './navbar'
// import Footer from './footer'

import Image from "next/image"
import TeamSwitcher from "../team-switcher"
import { MainNav } from "../main-nav"

import { UserNav } from "../user-nav"
import { UserType } from "@/types/User"
 
export default function AdminLayout({user,
    children,
  }: {
    user:UserType,children: React.ReactNode
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
              <UserNav user={user} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}