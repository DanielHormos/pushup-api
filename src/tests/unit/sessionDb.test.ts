import { before, beforeEach, describe, it } from "node:test";
import {
  createSessionDb,
  SessionDb,
} from "../../app/create-db/createSessionDb";
import { deepEqual, strictEqual } from "assert";

describe("Session functional test", () => {
  let sessionDb: SessionDb;

  beforeEach(() => {
    sessionDb = createSessionDb();
  });

  it("Should start with an empty session list", async () => {
    const sessions = await sessionDb.getAll();
    deepEqual(sessions, []);
  });

  it("Should add a session and retrieve it by id", async () => {
    const mockSession = {
      sessionUuid: "uuid",
      repetitions: 20,
      date: "2024-10-22",
      notes: "Felt tough today",
    };
    await sessionDb.add(mockSession);

    const session = await sessionDb.getAll();
    deepEqual(session, [mockSession]);

    const sessionById = await sessionDb.getById("uuid");
    strictEqual(sessionById, mockSession);
  });

  it("Should update a session by ID", async () => {
    const mockSession = {
      sessionUuid: "mocksessionuuid",
      repetitions: 20,
      date: "2024-10-22",
      notes: "Felt tough today",
    };

    await sessionDb.add(mockSession);

    const updatedData = { repetitions: 30, notes: "Felt stronger today" };
    await sessionDb.patch("mocksessionuuid", updatedData);

    const updatedSession = await sessionDb.getById("mocksessionuuid");
    deepEqual(updatedSession, {
      sessionUuid: "mocksessionuuid",
      repetitions: 30,
      date: "2024-10-22",
      notes: "Felt stronger today",
    });
  });

  it("Should throw an error when deleting session that dont exist", async () => {
    try {
      await sessionDb.delete("nonExistingUUID");
    } catch (error) {
      strictEqual((error as Error).message, "Session not found");
    }
  });

  it("Should throw an error when updating nonexisting session", async () => {
    const updatedData = { repetitions: 30, notes: "Non existant update" };
    try {
      await sessionDb.patch("nonExistingUUID", updatedData);
    } catch (error) {
      strictEqual((error as Error).message, "Session not found");
    }
  });
});
