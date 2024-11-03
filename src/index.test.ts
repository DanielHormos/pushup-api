import { deepEqual } from "assert";
import test, { beforeEach } from "node:test";
import request from "supertest";
import { createApp } from "../src/app/session-app";

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

test("GET session that dont exist", async () => {
  const falseUuid = "2036f17e-e7a6-4084-9979-6dd6ee193001";
  const getResult = await request(app).get(`/api/sessions/${falseUuid}`);
  deepEqual(getResult.status, 404);
});

test("GET session by uuid after POST", async () => {
  const mockSession = {
    repetitions: 250,
    notes: "Nice workout",
  };
  const postResult = await request(app).post("/api/sessions").send(mockSession);
  const sessionUuid = postResult.body.sessionUuid;

  const getResult = await request(app).get(`/api/sessions/${sessionUuid}`);
  deepEqual(getResult.status, 200);
  deepEqual(
    { repetitions: getResult.body.repetitions, notes: getResult.body.notes },
    mockSession
  );
});

test("Delete session that dont exist", async () => {
  const falseUuid = "2036f17e-e7a6-4084-9979-6dd6ee193001";
  const getResult = await request(app).delete(`/api/sessions/${falseUuid}`);
  deepEqual(getResult.status, 404);
});

test("DELETE session by uuid after POST", async () => {
  const mockSession = {
    repetitions: 250,
    notes: "nICE WORKOUT",
  };
  const postResult = await request(app).post("/api/sessions").send(mockSession);
  const sessionUuid = postResult.body.sessionUuid;

  const deleteResult = await request(app).delete(
    `/api/sessions/${sessionUuid}`
  );
  deepEqual(deleteResult.status, 204);
  const getResult = await request(app).get("/api/sessions");
  deepEqual(getResult.body, []);
});

test("PATCH session by id that dont exist", async () => {
  const falseUuid = "2036f17e-e7a6-4084-9979-6dd6ee193001";
  const getResult = await request(app).patch(`/api/sessions/${falseUuid}`);
  deepEqual(getResult.status, 404);
});

test("PATCH session by id that exist", async () => {
  const mockSession = {
    repetitions: 250,
    notes: "Patching workout",
  };
  const postResult = await request(app).post("/api/sessions").send(mockSession);
  const sessionUuid = postResult.body.sessionUuid;
  const date = postResult.body.date;

  const patchResult = await request(app)
    .patch(`/api/sessions/${sessionUuid}`)
    .send({
      sessionUuid: `${sessionUuid}`,
      date: `${date}`,
      repetitions: 300,
      notes: "50 more",
    });
  deepEqual(patchResult.status, 200);
  const getResult = await request(app).get("/api/sessions");
  deepEqual(getResult.body, [
    {
      sessionUuid: `${sessionUuid}`,
      date: `${date}`,
      repetitions: 300,
      notes: "50 more",
    },
  ]);
});
