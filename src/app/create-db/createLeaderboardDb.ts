import { Leaderboard } from "../../features/leaderboard/types";

export function createLeaderboardDb() {
  const leaderboard: Leaderboard[] = [];

  return {
    getAll: async () => leaderboard,
    add: async (leaderboardPost: Leaderboard) => {
      leaderboard.push(leaderboardPost);
    },
  };
}
