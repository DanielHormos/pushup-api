import { Router } from "express";
import { Session, sessionSchema } from "./types";

type Db = {
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

      router.post("/", async (req, res) => {
        try {
          const session = req.body;
          sessionSchema.parse(session);
          db.add(session);
          res.status(201).end();
        } catch (error) {
          res.status(400).end();
        }
      });

      return router;
    },
  };
}
