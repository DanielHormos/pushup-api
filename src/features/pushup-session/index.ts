import { Router } from "express";

export function createPushupSessionFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", (req, res) => {});

      return router;
    },
  };
}
