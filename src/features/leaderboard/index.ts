import { Router } from "express";
import { Leaderboard, leaderboardSchema } from "./types";
import { v4 } from "uuid";

type Db = {
  getAll: () => Promise<Leaderboard[]>;
  add: (leaderboard: Leaderboard) => Promise<void>;
};

export function createLeaderboardFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        res.json(await db.getAll());
      });

      router.post("/", async (req, res) => {
        try {
          const leaderboardPost = {
            leaderboardPostUuid: v4(),
            ...req.body,
          };
          leaderboardSchema.parse(leaderboardPost);
          await db.add(leaderboardPost);
          res.status(201).json(leaderboardPost);
        } catch (error) {
          res.status(400).end();
        }
      });
      return router;
    },
  };
}
