import { Router } from "express";
import { Session, sessionSchema } from "./types";
import { v4 } from "uuid";

type Db = {
  getById: (uuid: string) => Promise<Session | null>;
  getAll: () => Promise<Session[]>;
  add: (session: Session) => Promise<void>;
};

export function createSessionFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();
      router.get("/", async (req, res) => {
        res.json(await db.getAll());
      });

      router.get("/:uuid", async (req, res) => {
        const { uuid: sessionUuid } = req.params;
        const sessionById = await db.getById(sessionUuid);

        if (sessionById) res.json(sessionById);
        else res.status(404).json({ error: "Session not found" });
      });

      router.post("/", async (req, res) => {
        try {
          const date = new Date().toJSON().slice(0, 10);
          const session = {
            sessionUuid: v4(),
            date: date,
            ...req.body,
          };

          sessionSchema.parse(session);

          await db.add(session);
          res.status(201).json(session);
        } catch (error) {
          res.status(400).end();
        }
      });

      return router;
    },
  };
}
