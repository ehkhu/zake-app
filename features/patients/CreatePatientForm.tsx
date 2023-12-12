"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
// import { createEditPatient } from "@/services/apiPatients";
import { useCreatePatient } from "./useCreatePatient";
import { useEditPatient } from "./useEditPatient";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  date_of_birth: z.date({
    required_error: "A date of birth is required.",
  }),
  contact_number: z.string().min(9, {
    message: "Phone number must be at least 9 characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  address: z.string(),
  medical_history: z.string(),
});

export function CreatePatientForm({ patientToEdit = {}}) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<any>({});

  //for edit 
  let idToUpdate = 0;
  let editValues:any = patientToEdit;
  const isEditSession = Boolean(editValues.id);
  if(isEditSession){
    idToUpdate = editValues.id;
    editValues = {
      ...editValues,
      date_of_birth: new Date(editValues.date_of_birth),
    };
    console.log(editValues)
  };

  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditSession ? editValues : {
      name: "",
      date_of_birth: new Date(),
      contact_number: "",
      email: "",
      address: "",
      medical_history: "",
    },
  });
  const {createPatient,isCreating} = useCreatePatient();
  const {editPatient,isUpdating} = useEditPatient();
  const isWorking:boolean= isCreating || isUpdating;
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //mutation.mutate(value);
    if(isEditSession){
      editPatient({patient:values,id:idToUpdate},{onSuccess:()=>{
        setErrors({});
      },
      onError: (err) => onError(err)
      });
    }else{
      createPatient(values,{onSuccess:()=>{
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Name</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Patient Name" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
                {errors.nam && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.name[0]}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Date of birth</FormLabel>
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

          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Contact Number</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
                {errors.contact_number && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.contact_number[0]}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Email</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
                <div className="col-span-3">
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email[0]}
                  </div>
                )}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Address</FormLabel>
                <FormControl className="col-span-3">
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage className="col-span-3"/>
                {errors.address && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.address[0]}
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medical_history"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel>Medical History</FormLabel>
                <FormControl className="col-span-3">
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-3"/>
                {errors.medical_history && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.medical_history[0]}
                  </div>
                )}
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </>
  );
}
