import express from "express";
import { createPushupSessionFeature } from "../features/pushup-session";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const sessionFeature = createPushupSessionFeature();

  app.use("/api/pushup-sessions", sessionFeature.getRouter());

  return app;
}
