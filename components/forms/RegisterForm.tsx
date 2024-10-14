// https://ui.shadcn.com/docs/components/form - support for client and server side validation
// Using shadcn to set up form in general know as a master class in creating complex and reusable forms.
// using React Hook Form and Zod: From are tricky cause it
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"; // zod is use for validation
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
  Doctors
} from "@/constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RegisterForm = ({ user }: { user: User }) => {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome👋🏻</h1>
          <p className="text-dark-700">
            Your medical history helps us tailor care just for you. With easy
            access to your records and appointments, we’re here to ensure you
            receive the best care, every time.
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          //strange input a string {'input'}because it a string mostly make mistakes
          // sth like {'inpt'} => very hard to know mistake bcs its was a string i wouldn't
          //throw error -> Type is not assignable to type "FormFieldType"
          fieldType={FormFieldType.INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="name"
          label="Full Name"
          placeholder="Hillary Q.An"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        {/* xl:flex-row. Because have 2 column grid */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER} //=> we use this to if the input was wrong "INUT" -> immediately show error
            control={form.control} //--Property INUT not exist on type
            name="birthDate"
            label="Date of Birth"
          />
          <CustomFormField
            //Using SKELETON if we can pass a custom render that it will get access to the field
            //then render whatever u want
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {/*With each option it'll automatically return a div  */}
                  <RadioGroup>
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </RadioGroup>{" "}
                *
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <CustomFormField
          fieldType={FormFieldType.INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="address"
          label="Address"
          placeholder="20 Cong Hoa Street District Tan Binh, HCMC"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="occupation"
          label="Occupation"
          placeholder="Teacher"
        />
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <CustomFormField
          fieldType={FormFieldType.INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="emergencyContactName"
          label="Emergency Contact Name"
          placeholder="Guardian's Name"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="emergencyContactNumber"
          label="Emergency Contact Number"
          placeholder="(+84) 123-45678"
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        {/* PRIMARY CARE PHYSICIAN */}
        <CustomFormField
          fieldType={FormFieldType.SELECT} //=> we use this to if the input was wrong "INUT" -> immediately show error
          control={form.control} //--Property INUT not exist on type
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician"
        >
          {/* extensible component of CustomerFormField */}
         
          {Doctors.map((doctor) => 
          (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
        </CustomFormField>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
export default RegisterForm;
