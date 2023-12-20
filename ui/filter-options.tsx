'use client';


import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';

function FilterOptions({ filterField, options}:any) {
  const fitlerTitle = filterField.replace('_',' ');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  console.log(currentFilter);
  const handleFilter = useDebouncedCallback((term) => {
  const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set(filterField, term);
    } else {
      params.delete(filterField);
    }
    replace(`${pathname}?${params.toString()}`);
  },300);

  return (
    <div>
    <div className='pb-1'>
      <Label className='capitalize'>{fitlerTitle}</Label>
    </div>
    <Select onValueChange={handleFilter} defaultValue={currentFilter}>
      <SelectTrigger>
        <SelectValue placeholder="Expense Types" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {options.map((option:any) => (
              <SelectItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    );
}

export default FilterOptions;