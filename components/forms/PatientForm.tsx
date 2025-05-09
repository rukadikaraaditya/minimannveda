"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { create } from "domain"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
  INPUT="input",
  TEXTAREA="textarea",
  PHONE_INPUT="phoneInput",
  CHECKBOX="checkbox",
  DATE_PICKER="datePicker",
  SELECT="select",
  SKELETON="skeleton",
}


 
const PatientForm=()=> {
  const router=useRouter();
  const [isLoading, setIsLoading] = useState(false)


  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    try{
      const userData={name,email,phone};
      const user= await createUser(userData);
      if(user) router.push(`/patients/${user.$id}/register`)

    } catch(error){
      console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">A better tomorrow begins with self-care today. 🌞 </h1>
            <p className="text-dark-700">Take that first step.🤝</p>
        </section>
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Aditya Rukadikar"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"

        />
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="adityarukadikar@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email icon"
        />
        <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="+91 1234567890"
          iconSrc="/assets/icons/phone.svg"
          iconAlt="phone icon"
        />
        <SubmitButton isLoading = {isLoading} >Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm;
