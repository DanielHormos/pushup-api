import express from "express";
import { Leaderboard } from "../features/leaderboard/types";
import { createLeaderboardFeature } from "../features/leaderboard";

function createLeaderboardDb() {
  const leaderboard: Leaderboard[] = [];

  return {
    getAll: async () => leaderboard,
    add: async (leaderboardPost: Leaderboard) => {
      leaderboard.push(leaderboardPost);
    },
    // getById: async (uuid: string) => {
    //   return sessions.find((session) => session.sessionUuid === uuid) || null;
    // },

    // delete: async (uuid: string): Promise<void> => {
    //   const index = sessions.findIndex(
    //     (session) => session.sessionUuid === uuid
    //   );
    //   if (index === -1) {
    //     throw new Error("Session not found");
    //   }
    //   sessions.splice(index, 1);
    // },
    // patch: async (
    //   uuid: string,
    //   updatedData: Partial<Session>
    // ): Promise<void> => {
    //   const index = sessions.findIndex(
    //     (session) => session.sessionUuid === uuid
    //   );
    //   if (index === -1) {
    //     throw new Error("Session not found");
    //   }

    //   sessions[index] = { ...sessions[index], ...updatedData };
    // },
  };
}

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const leaderboardDb = createLeaderboardDb();
  const leaderboardFeature = createLeaderboardFeature(leaderboardDb);

  app.use("/api/leaderboard", leaderboardFeature.getRouter());

  return app;
}
