'use client';


import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label';
 
const days = [
    {
        value: "",
        label: "Select Days...",
    },
    {
      value: "1",
      label: "Today",
  },
    {
        value: "5",
        label: "5 Days",
    },
    {
        value: "10",
        label: "10 Days",
    },
    {
        value: "30",
        label: "30 Days",
    },
]

export default function FilterByDays() {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilter = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('in_days', term);
    } else {
      params.delete('in_days');
    }
    replace(`${pathname}?${params.toString()}`);
  },300);

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  React.useEffect(() => {
    let v : string|undefined = searchParams.get('in_days')?.toString();
    setValue(v?v:"");
  },[])
  return (

    <div className='flex flex-col'>
      <Label>By Days</Label>
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? days.find((day) => day.value === value)?.label
            : "Select day..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search Day..." /> */}
          <CommandEmpty>No day found.</CommandEmpty>
          <CommandGroup>
            {days.map((day) => (
              <CommandItem
                key={day.value}
                value={day.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  handleFilter((currentValue === value ? "" : currentValue));
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === day.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {day.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
    </div>
    )
//   return (
        // <Input type="search" placeholder={placeholder} 
        //   className="md:w-[200px] lg:w-[300px]"
        //   onChange={(e) => {
        //     handleFilter(e.target.value);
        //   }}
        //   defaultValue={searchParams.get('in_days')?.toString()}
        // />
//   );
}
