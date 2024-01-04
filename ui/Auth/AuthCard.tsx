import React, { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  logo: ReactNode
  children: ReactNode
}

const AuthCard = ({ logo, children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <div>{logo}</div>

      <Card className='w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'>
        <CardContent className='p-0'>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCard
