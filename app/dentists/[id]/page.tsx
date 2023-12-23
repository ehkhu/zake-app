import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import DentistDetail from "@/features/dentists/DentistDetail"


export default function Page({ params }: { params: { id: string } }) {
return (<>
      {/* <!-- BEGIN: Profile Info --> */}
      <DentistDetail anDentistId={params.id}></DentistDetail>
      </>)   
}