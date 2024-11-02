import { Router } from "express";
import { Session } from "./types";

type Db = {
  getAll: () => Promise<Session[]>;
  add: (session: Session) => Promise<void>;
};

export function createSessionFeature(db: Db) {
  return {
    getRouter() {
      const router = Router();
      router.get("/", (req, res) => {
        //async?
        res.json(db.getAll());
      });

      return router;
    },
  };
}
