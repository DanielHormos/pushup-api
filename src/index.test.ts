import { deepEqual } from "assert";
import test, { beforeEach } from "node:test";
import request from "supertest";
import { createApp } from "../app/app";

let app;

beforeEach(() => {
  app = createApp();
});

test("Supertest works!", async () => {
  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { status: "ready" });
});
