import express from "express";
import { createSessionFeature } from "../features/session";
import { Session } from "../features/session/types";

function createSessionDb() {
  const sessions: Session[] = [];

  return {
    getAll: async () => sessions,
    getById: async (uuid: string) => {
      return sessions.find((session) => session.sessionUuid === uuid) || null;
    },
    add: async (session: Session) => {
      sessions.push(session);
    },
    delete: async (uuid: string): Promise<void> => {
      const index = sessions.findIndex(
        (session) => session.sessionUuid === uuid
      );
      if (index === -1) {
        throw new Error("Session not found");
      }
      sessions.splice(index, 1);
    },
    patch: async (
      uuid: string,
      updatedData: Partial<Session>
    ): Promise<void> => {
      const index = sessions.findIndex(
        (session) => session.sessionUuid === uuid
      );
      if (index === -1) {
        throw new Error("Session not found");
      }

      sessions[index] = { ...sessions[index], ...updatedData };
    },
  };
}

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/status", async (req, res) => {
    res.json({ status: "ready" });
  });

  const sessionDb = createSessionDb();
  const sessionFeature = createSessionFeature(sessionDb);

  app.use("/api/sessions", sessionFeature.getRouter());

  return app;
}
