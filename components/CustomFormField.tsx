/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string; //"?:" it mean optional
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string; //it will only be shown in input containing a date
  showTimeSelect?: boolean; //show to further modify the calendar inputs whether we want to show time or not
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode; // show a loading state for an input
}
// What the renderField will be accepting
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT: //only if the formfieldtype is an input -> can return <div></div>
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2" //margin-left if 2 - divide it a bit from the left
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field} //destructure everything else from this field that we're passing into it
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          {/* using react-phone-number-input -- international phonenum v3.4.6 
                    must import react-phone-number-input
                    */}
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2" //margin-left if 2 - divide it a bit from the left
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    default:
      break;
  }
};

//the fieldType to render different kinds of inputs or fields
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control} //pass the form from PatientForm as a property over to the customefields
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />

    // <FormItem className="flex-1">
    //   {fieldType !== FormFieldType.CHECKBOX &&
    //     label && ( //if fieldType isnot checkbox&if label exists then show label
    //       <FormLabel>{label}</FormLabel>
    //     )}

    //  field to let we know what kind of field we render | Can render different kind of field depend on the FormFieldType
    //   <RenderField field={fieldType} props={props} />
    // </FormItem>
  );
};

export default CustomFormField;
