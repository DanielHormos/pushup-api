import { Router } from "express";

function createPushupSessionFeature() {
  return {
    getRouter() {
      const router = Router();
      router.get("/", (req, res) => {});
    },
  };
}
