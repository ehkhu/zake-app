import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import PatientDetail from "@/features/patients/PatientDetail"


export default function Page({ params }: { params: { id: string } }) {
 return (<>
        {/* <!-- BEGIN: Profile Info --> */}
        <PatientDetail anPatientId={params.id}></PatientDetail>
        </>)   
}