import z from "zod";
export type Session = z.infer<typeof sessionSchema>;

export const sessionSchema = z.object({
  sessionUuid: z.string(),
  repetitions: z.number(),
  date: z.date(),
  notes: z.string(),
});
