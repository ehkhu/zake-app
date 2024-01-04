'use client'
import { ReactNode, Suspense } from 'react'
import { useAuth } from '@/hooks/auth'
import AdminLayout from '@/ui/Layout/Admin'
import SidebarLayout from '@/ui/side-layout'

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
      <AdminLayout user={user}>
        <SidebarLayout>
          <main className='h-full flex-1 flex-col space-y-4 px-2 md:flex'>
            {children}
          </main>
        </SidebarLayout>
      </AdminLayout>
  )
}

export default AppLayout
