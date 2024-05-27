import { z } from "zod";
import validator from "validator";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
  place: z.string().min(1, { message: "required" }),
  lat: z.number(),
  lng: z.number(),
  role: z.array(z.string()),
});
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
