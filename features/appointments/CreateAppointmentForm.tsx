"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import { format} from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { useCreateAppointment } from "./useCreateAppointment";
import { useEditAppointment } from "./useEditAppointment";
import { Check, ChevronsUpDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllPatients } from "@/services/apiPatients";
import { getAllDentists } from "@/services/apiDentists";

const targetTimeZone = "Asia/Yangon";

const formSchema = z.object({
  patient_id: z.string({
    required_error: "Please select a patient.",
  }),
  dentist_id: z.string({
    required_error: "Please select a patient.",
  }),
  notes: z.string(),
  status: z
  .string({
    required_error: "Please select an status.",
  }),
  appointment_date: z.date({
    required_error: "Appointment Date is required.",
  }),
});

let patients = [
  { label: "English", value: "en" },
];

let dentists = [
  { label: "English", value: "en" },
];

export function CreateAppointmentForm( {appointmentToEdit = {}}:any) {
  //Fetch Patient 
  //Fetch Dentist
  //Create Appointment

  // console.log("Add exponse exaonseList", expList);
  const {
    isLoading:patientLoading,
    data:patientData,
    error:patientError,
  }=useQuery({
    queryKey: ["allPatients"],
    queryFn:getAllPatients
  });

  const {
    isLoading:dentistLoading,
    data:dentistData,
    error:dentistError,
  }=useQuery({
    queryKey: ["allPatients"],
    queryFn:getAllDentists
  });
  
  const { toast } = useToast();
  const [errors, setErrors] = useState<any>({});
  if(patientData) patients = patientData.data;
  if(dentistData) dentists = dentistData.data;
  const currentDate = new Date();
  
  //for edit 
  let idToUpdate = 0;
  let editValues:any = appointmentToEdit;
  const isEditSession = Boolean(editValues.id);
  if(isEditSession){
    idToUpdate = editValues.id;
    editValues = {
      ...editValues,
      patient_id:editValues.patient_id.toString(),
      dentist_id:editValues.dentist_id.toString(),
      appointment_date: new Date(editValues.appointment_date),
    };
    // console.log(editValues)
  };

  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditSession ? editValues : {
      status:'scheduled',
      notes:''
    },
  });
  const {createAppointment,isCreating} = useCreateAppointment();
  const {editAppointment,isUpdating} = useEditAppointment();
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
      editAppointment({appointment:values,id:idToUpdate},{onSuccess:()=>{
        setErrors({});
      },
      onError: (err) => onError(err)
      });
    }else{
      createAppointment(values,{onSuccess:()=>{
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
  // if(isLoading) return 'loading...';
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dentist_id"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Dentist</FormLabel>
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
                        ? dentists.find(
                            (dentist_id) => dentist_id.value === field.value
                          )?.label
                        : "Select Dentist ..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search dentist type..." />
                    <CommandEmpty>No dentist type found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72 w-48">
                      {dentists.map((dentist_id) => (
                        <CommandItem
                          value={dentist_id.label}
                          key={dentist_id.value}
                          onSelect={() => {
                            form.setValue("dentist_id", dentist_id.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              dentist_id.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {dentist_id.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the dentist_id that will be used in the dashboard.
              </FormDescription> */}
              <FormMessage className="col-span-3"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="patient_id"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Patient</FormLabel>
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
                        ? patients.find(
                            (patient_id) => patient_id.value === field.value
                          )?.label
                        : "Select Patient ..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search patient type..." />
                    <CommandEmpty>No patient type found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-72 w-48">
                      {patients.map((patient_id) => (
                        <CommandItem
                          value={patient_id.label}
                          key={patient_id.value}
                          onSelect={() => {
                            form.setValue("patient_id", patient_id.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              patient_id.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {patient_id.label}
                        </CommandItem>
                      ))}
                      </ScrollArea>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                This is the patient_id that will be used in the dashboard.
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
                  <Input placeholder="Appointment Note" {...field} />
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
          name="status"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {/* scheduled, cancelled, completed */}
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="col-span-3"/>
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="appointment_date"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Appointment Date</FormLabel>
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
