import { deepEqual } from "assert";
import test, { beforeEach } from "node:test";
import request from "supertest";
import { createApp } from "../src/app/app";

let app;

beforeEach(() => {
  app = createApp();
});

test("Supertest works!", async () => {
  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { status: "ready" });
});

test("GET /api/pushup-sessions", async () => {
  const result = await request(app).get("/api/pushup-sessions");

  deepEqual(result.body, [
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
  ]);
});

test.skip("POST /api/pushup-sessions", async () => {});

test.skip("GET /api/pushup-sessions/:id", async () => {});
