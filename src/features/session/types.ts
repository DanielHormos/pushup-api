import z from "zod";
export type Session = z.infer<typeof sessionSchema>;

export const sessionSchema = z.object({
  sessionUuid: z.string(),
  repetitions: z.number().positive(),
  date: z.string(),
  notes: z.string(),
});
