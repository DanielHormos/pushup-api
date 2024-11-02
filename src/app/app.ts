import express from "express";
import { createSessionFeature } from "../features/pushup-session";
import { Session } from "../features/pushup-session/types";

function createDb() {
  const sessions: Session[] = [];
  return {
    getAll: async () => sessions,
    add: async (session: Session) => {
      sessions.push(session);
    },
  };
}

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const sessionDb = createDb();
  const sessionFeature = createSessionFeature(sessionDb);

  app.use("/api/sessions", sessionFeature.getRouter());

  return app;
}
