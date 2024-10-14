// https://ui.shadcn.com/docs/components/form - support for client and server side validation
// Using shadcn to set up form in general know as a master class in creating complex and reusable forms.
// using React Hook Form and Zod: From are tricky cause it
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"; // zod is use for validation
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  CHECKBOX = "checkbox",
}

const PatientForm = () => {
  const router = useRouter(); //using next/navigation = nextJS
  const [isLoading, setIsLoading] = useState(false);
  //export again at the bottom
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler. where you render some logic that happens once the user submit the form
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    //destructure values to name,email,phone
    setIsLoading(true);

    //accepting name and email, phone from homepage
    try {
      //Have to take this userdata to pass and create user in db => using appwrite
      const userData = { name, email, phone };

      //Define user before create
      const user = await createUser(userData); //define user variable

      //if we have new user so it'll use the router to push to the registration form
      //userid will dynamically be coming from Appwrite db
      //=> redirect to registration form
      if (user) router.push("/patients/${user.$id}/register"); //Need to create userId and create dynamic route for each
    } catch (error) {
      console.log(error);
    }
  }

  //the UI
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there👋🏻</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          //strange input a string {'input'}because it a string mostly make mistakes
          // sth like {'inpt'} => very hard to know mistake bcs its was a string i wouldn't
          //throw error -> Type is not assignable to type "FormFieldType"
          fieldType={FormFieldType.INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="name"
          label="Full name"
          placeholder="Hillary Q.An"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="email"
          label="Email"
          placeholder="antqgcs190705@fpt.edu.vn"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="phone"
          label="Phone number"
          placeholder="(+84) 123-45678"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
export default PatientForm;
