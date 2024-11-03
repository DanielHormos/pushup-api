import z from "zod";
export type Leaderboard = z.infer<typeof leaderboardSchema>;

export const leaderboardSchema = z.object({
  leaderboardPostUuid: z.string(),
  maxRepetitions: z.number(),
  username: z.string(),
});
