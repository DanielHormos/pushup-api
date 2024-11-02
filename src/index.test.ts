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
  const mockSession = {
    sessionUuid: "abcdefghijg",
    repetitions: 250,
    date: "02-11-2024",
    notes: "Nice workout",
  };
  const result = await request(app).post("/api/sessions").send(mockSession);
  deepEqual(result.status, 201);

  const getResult = await request(app).get("/api/sessions");
  const sessions = getResult.body;

  deepEqual(sessions[0], mockSession);
});

test("GET /api/sessions", async () => {
  const mockSession = {
    sessionUuid: "defghijg",
    repetitions: 250,
    date: "02-11-2024",
    notes: "Nice workout",
  };
  const mockSession2 = {
    sessionUuid: "abc",
    repetitions: 100,
    date: "02-12-2024",
    notes: "weird workout",
  };
  await request(app).post("/api/sessions").send(mockSession);
  await request(app).post("/api/sessions").send(mockSession2);
  const result = await request(app).get("/api/sessions");

  deepEqual(result.body, [
    {
      sessionUuid: "defghijg",
      repetitions: 250,
      date: "02-11-2024",
      notes: "Nice workout",
    },
    {
      sessionUuid: "abc",
      repetitions: 100,
      date: "02-12-2024",
      notes: "weird workout",
    },
  ]);
});

test.skip("GET /api/sessions/:id", async () => {});
