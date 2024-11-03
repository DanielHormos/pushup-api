import { Router } from "express";
import { Leaderboard, leaderboardSchema } from "./types";

type Db = {
  getAll: () => Promise<Leaderboard | null>;
};

export function createLeaderboardFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        res.json(await db.getAll());
      });
    },
  };
}
