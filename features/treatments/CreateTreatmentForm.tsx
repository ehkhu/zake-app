"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { format} from "date-fns";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useCreateTreatment } from "./useCreateTreatment";
import { useEditTreatment } from "./useEditTreatment";
import { Check, ChevronsUpDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import { getAllTreatmentTypes } from "@/services/apiTreatmentTypes";
import { ScrollArea } from "@/components/ui/scroll-area";

const targetTimeZone = "Asia/Yangon";

const formSchema = z.object({
  notes: z.string(),
  amount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }),
  treatment_date: z.date({
    required_error: "Treatment Date is required.",
  }),
  treatment_type_id: z.string({
    required_error: "Please select a treatment_type_id.",
  }),
});

let treatment_type_ids = [
  { label: "English", value: "en" },
];

export function CreateTreatmentForm( {treatmentToEdit = {}}:any) {
  // console.log("Add exponse exaonseList", expList);
  const {
    isLoading,
    data,
    error,
  }=useQuery({
    queryKey: ["allTreatmentTypes"],
    queryFn:getAllTreatmentTypes
  });
  
  const { toast } = useToast();
  const [errors, setErrors] = useState<any>({});
  if(data) treatment_type_ids = data.data;
  const currentDate = new Date();
  /*
  ref model 
  id: 1,
  amount: "63.87",
  treatment_date: "1988-09-16",
  notes: "Error voluptatem earum assumenda rerum. Vitae rerum sit adipisci aut quam maxime et. Aut porro ut qui facilis nihil ut.",
  created_at: "2023-12-02 15:53:00",
  updated_at: "2023-12-02 15:53:00",
  treatment_type_id: 11,
  */
  //for edit 
  let idToUpdate = 0;
  let editValues:any = treatmentToEdit;
  const isEditSession = Boolean(editValues.id);
  if(isEditSession){
    idToUpdate = editValues.id;
    editValues = {
      ...editValues,
      treatment_type_id:editValues.treatment_type_id.toString(),
      treatment_date: new Date(editValues.treatment_date),
    };
    // console.log(editValues)
  };

  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditSession ? editValues : {
      treatment_type_id:"",
      notes: "",
      amount:"",
    },
  });
  const {createTreatment,isCreating} = useCreateTreatment();
  const {editTreatment,isUpdating} = useEditTreatment();
  const isWorking:boolean= isCreating || isUpdating;
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //mutation.mutate(value);
    
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // })
    // return 0;
    if(isEditSession){
      editTreatment({treatment:values,id:idToUpdate},{onSuccess:()=>{
        setErrors({});
      },
      onError: (err) => onError(err)
      });
    }else{
      createTreatment(values,{onSuccess:()=>{
        form.reset();
        setErrors({});
      },
      onError: (err) => onError(err)
      });
    }
  }
  
  function onError(errors: any) {
    if (errors.response && errors.response.status === 422) {
      // Validation errors
      setErrors(errors.response.data.error.errors);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.response.data.error.message,
      });
    } else {
      // Handle other types of errors
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errors.message,
      });
    }
  }
  if(isLoading) return 'loading...';
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="treatment_type_id"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Exense On</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                <FormControl className="col-span-3">
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? treatment_type_ids.find(
                            (treatment_type_id) => treatment_type_id.value === field.value
                          )?.label
                        : "Select Treatment ..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search treatment type..." />
                    <CommandEmpty>No treatment type found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72 w-48">
                      {treatment_type_ids.map((treatment_type_id) => (
                        <CommandItem
                          value={treatment_type_id.label}
                          key={treatment_type_id.value}
                          onSelect={() => {
                            form.setValue("treatment_type_id", treatment_type_id.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              treatment_type_id.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {treatment_type_id.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the treatment_type_id that will be used in the dashboard.
              </FormDescription> */}
              <FormMessage className="col-span-3"/>
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Note</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Treatment Note" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
                {errors.nam && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.notes[0]}
                  </div>
                )}
              </FormItem>
            )}
          />

          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Amount</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Amount" {...field} type="number"/>
                </FormControl>
                <FormMessage className="col-span-3"/>
                {errors.amount && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.amount[0]}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="treatment_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Treatment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="col-span-3">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="col-span-3"/>
              </FormItem>
            )}
          />
          <div className="text-right">
              <Button type="submit" disabled={isWorking}>
                {isWorking ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>{" "}
                    Processing...
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
