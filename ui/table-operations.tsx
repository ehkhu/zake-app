import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Filter } from "lucide-react"
export default function TableOperations({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <>
        {/* table operations */}
        <Popover>
            <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
                <Filter className="w-4 h-4"></Filter>
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px]">
            <div className="flex flex-col space-y-4 content-center">
            {children}
            </div>
            </PopoverContent>
        </Popover>
        {/* end table operations */}
        </>
    )
}