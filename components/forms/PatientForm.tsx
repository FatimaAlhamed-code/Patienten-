"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,

} from "@/components/ui/form"
import CustomFormFiled from "../CustomFormFiled"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

 export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA='textarea',
  PHONE_INPUT='phoneInput',
  CHECKBOX='checkbox',
  DATE_PICKER='datePicker',
  SELECT='select',
  SKELETON='skeleton',

 }
const  PatientForm=()=> {

  const router = useRouter();
  const[isLoading,setisLoading]= useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email ,phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
     setisLoading(true)

     try{

    const userData = {name, email ,phone};

     const user = await createUser(userData);
     if(user)
     {
      router.push(`/patients/${user.$id}/register`);
     } 

     }catch(error)
     {
      console.log(error)
     }
     
    //create anew pation
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
      <section className="mb-12 space-y-4">
        <h1 className="header">Hi there </h1>
        <p className="text-dark-700 "> Schedule your first appointment</p>
      </section>

      <CustomFormFiled
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='name'
      label= 'Full name'
      placeholder='Fatima ALHAMED'
      iconSrc='/assets/icons/user.svg'
      iconAlt='user'
      />
          <CustomFormFiled
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='email'
      label= 'Email'
      placeholder='Fatima@gmail.com'
      iconSrc='/assets/icons/email.svg'
      iconAlt='email'
      />

<CustomFormFiled
      fieldType={FormFieldType.PHONE_INPUT}
      control={form.control}
      name='phone'
      label= 'Phone number'
      placeholder='(555)'
      />
      <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm