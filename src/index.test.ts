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

test("GET /api/sessions should return empty array initially", async () => {
  const getResult = await request(app).get("/api/sessions");
  deepEqual(getResult.body, []);
});

test("POST empty body /api/sessions should return 400 status", async () => {
  const postResult = await request(app).post("/api/sessions").send();
  deepEqual(postResult.status, 400);
});

test("POST one session", async () => {
  const mockSession = {
    repetitions: 250,
    notes: "Nice workout",
  };
  const postResult = await request(app).post("/api/sessions").send(mockSession);
  deepEqual(postResult.status, 201);

  const getResult = await request(app).get("/api/sessions");
  const sessions = getResult.body[0];

  deepEqual(
    { repetitions: sessions.repetitions, notes: sessions.notes },
    mockSession
  );
});

test("GET one session", async () => {
  const mockSession = {
    repetitions: 250,
    notes: "Nice workout",
  };

  await request(app).post("/api/sessions").send(mockSession);
  const result = await request(app).get("/api/sessions");
  const resultBody = result.body[0];

  deepEqual(
    { repetitions: resultBody.repetitions, notes: resultBody.notes },
    {
      repetitions: 250,
      notes: "Nice workout",
    }
  );
});

test("POST many sessions and GET them", async () => {
  const mockSessionOne = {
    repetitions: 250,
    notes: "Nice workout",
  };
  const mockSessionTwo = {
    repetitions: 250,
    notes: "Nice workout",
  };
  const postResultOne = await request(app)
    .post("/api/sessions")
    .send(mockSessionOne);
  const postResultTwo = await request(app)
    .post("/api/sessions")
    .send(mockSessionTwo);
  deepEqual(postResultOne.status, 201);
  deepEqual(postResultTwo.status, 201);

  const getResult = await request(app).get("/api/sessions");
  const sessions = getResult.body;

  deepEqual(sessions.length, 2);
});

test("GET /api/sessions/:id", async () => {});
