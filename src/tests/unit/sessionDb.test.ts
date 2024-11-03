import { before, beforeEach, describe, it } from "node:test";
import { createSessionDb } from "../../app/create-db/createSessionDb";
import { deepEqual } from "assert";

describe("Session functional test", () => {
  let sessionDb;
  beforeEach(() => {
    sessionDb = createSessionDb();
  });

  it("Should start with an empty session list", async () => {
    const sessions = await sessionDb.getAll();
    deepEqual(sessionDb, []);
  });

  it("Should add a session and retrieve it by id", async () => {
    const mockSession = {
      sessionUuid: "mocksessionuuid",
      repetitions: 20,
      date: "2024-10-22",
      notes: "Felt tough today",
    };

    sessionDb.add(mockSession);

    const session = await sessionDb.getAll();
    deepEqual(session, mockSession);

    const sessionById = await sessionDb.getById("mocksessionuuid");
    deepEqual(sessionById, mockSession);
  });
});
