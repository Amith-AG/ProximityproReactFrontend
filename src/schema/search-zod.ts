import z from "zod";

export const searchSchema = z.object({
  address: z.string().min(1, { message: "required" }),
  lat: z.number(),
  lng: z.number(),
  role: z.enum([
    "plumber",
    "worker",
    "cleaner",
    "electrician",
    "painter",
    "mechanic",
  ]),
});
export type searchSchemaType = z.infer<typeof searchSchema>;
