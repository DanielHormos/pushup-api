import express from "express";
import { createSessionFeature } from "../features/session";
import { createLeaderboardFeature } from "../features/leaderboard";
import { createLeaderboardDb } from "./create-db/createLeaderboardDb";
import { createSessionDb } from "./create-db/createSessionDb";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const sessionDb = createSessionDb();
  const sessionFeature = createSessionFeature(sessionDb);

  const leaderboardDb = createLeaderboardDb();
  const leaderboardFeature = createLeaderboardFeature(leaderboardDb);

  app.use("/api/sessions", sessionFeature.getRouter());
  app.use("/api/leaderboard", leaderboardFeature.getRouter());

  return app;
}
