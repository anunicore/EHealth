import { z } from "zod";
//define Schema of ourFomr
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.") //minimum 2character
    .max(50, "Username must be at most 50 characters."), //max 2character
  email: z.string().email("Invalid email address"), //validates email
  phone: z.string().refine(
    (phone) => /^\+\d{10,15}$/.test(phone), //using regular expression /^\ to define validate international phone number - E164Num Format
    "Invalid phone number"
  ),
});
