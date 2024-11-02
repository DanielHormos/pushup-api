import { Router } from "express";

const db = [
  {
    session_uuid: "abc123",
    repetitions: 50,
    date: "2024-11-01",
    notes: "Improved my form",
  },
  {
    session_uuid: "def456",
    repetitions: 30,
    date: "2024-11-02",
    notes: "Felt a bit tired",
  },
];

export function createPushupSessionFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", (req, res) => {
        res.json(db);
      });

      return router;
    },
  };
}
