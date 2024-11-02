import z from "zod";
export type PushupSession = z.infer<typeof pushupSessionSchema>;

export const pushupSessionSchema = z.object({
  sessionUuid: z.string(),
  repetitions: z.number(),
  date: z.date(),
  notes: z.string(),
});
