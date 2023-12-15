import Link from "next/link";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black-100">
      <h1 className="text-3xl">DCMS Zake</h1>
      <Link href="/dashboard">Dashboard</Link>
   </main>
  )
}
