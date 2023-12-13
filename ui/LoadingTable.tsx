import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Skeleton } from "@/components/ui/skeleton"

  const arrayLength = 5;
  const iterableArray = Array.from({ length: arrayLength })
export function LoadingTable(){
    return (

<div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {iterableArray.map((_, index) => (
                    <TableHead key={index}>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
              {iterableArray.map((_, index) => (
                    <TableRow key={index}>
                        {iterableArray.map((_, index) => (
                        <TableCell key={index}>
                            <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        </TableCell>
                        ))}
                        <TableCell>
                            <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                  <TableRow>
                    <TableCell colSpan={arrayLength + 1}>
                    <Skeleton className="w-full h-[20px] rounded-full" />
                    </TableCell>
                  </TableRow>
              </TableFooter>
            </Table>
          </div>
    )
}