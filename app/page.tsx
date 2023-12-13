// import Image from 'next/image'
import { Loading } from "@/ui/Loading";
import { LoadingTable } from "@/ui/LoadingTable";
export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100">
      <h1 className="text-3xl underline">Hello Next !</h1>
      <LoadingTable></LoadingTable>
   </main>
  )
}
