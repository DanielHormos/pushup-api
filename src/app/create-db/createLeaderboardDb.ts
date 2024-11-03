import { Leaderboard } from "../../features/leaderboard/types";

export interface leaderboardDb {
  getAll: () => Promise<Leaderboard[]>;
  add: (leaderboardPost: Leaderboard) => Promise<void>;
}

export function createLeaderboardDb() {
  const leaderboard: Leaderboard[] = [];

  return {
    getAll: async () => leaderboard,
    add: async (leaderboardPost: Leaderboard) => {
      leaderboard.push(leaderboardPost);
    },
  };
}
