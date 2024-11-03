import z from "zod";
export type LeaderboardPost = z.infer<typeof leaderboardPost>;

export const leaderboardPost = z.object({
  leaderboardPostUuid: z.string(),
  maxRepetition: z.number(),
  username: z.string(),
});
