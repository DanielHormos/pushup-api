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

test("POST /api/sessions", async () => {
  const session = {
    sessionUuid: "abcdefghijg",
    repetitions: 250,
    date: "02-11-2024",
    notes: "Nice workout"
  }

  const result = await request.(app).post("/api/sessions").send(session)
  deepEqual(result.status, 201)
  
  const getResult = await request(app).get("/api/sessions")
  const sessions = getResult.body

  deepEqual(session, [session])

});

test("GET /api/sessions", async () => {
  const result = await request(app).get("/api/sessions");

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



test.skip("GET /api/sessions/:id", async () => {});
