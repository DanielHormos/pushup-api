import { Router } from "express";
import { Session, sessionSchema } from "./types";
import { v4 } from "uuid";

type Db = {
  getById: (uuid: string) => Promise<Session | null>;
  getAll: () => Promise<Session[]>;
  add: (session: Session) => Promise<void>;
  delete: (uuid: string) => Promise<void>;
  patch: (uuid: string, updatedData: Partial<Session>) => Promise<void>;
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

      router.delete("/:uuid", async (req, res) => {
        const { uuid } = req.params;
        console.log(uuid);

        try {
          await db.delete(uuid);
          res.status(204).end();
        } catch (error) {
          res.status(404).json({ error: "Session not found" });
        }
      });

      router.patch("/:uuid", async (req, res) => {
        const { uuid } = req.params;
        const updatedData = req.body;

        try {
          await db.patch(uuid, updatedData);
          res.status(200).json({ message: "Session updated successfully" });
        } catch (error) {
          res.status(404).json({ error: "Session not found" });
        }
      });

      return router;
    },
  };
}
