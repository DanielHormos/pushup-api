import { describe, it, beforeEach } from "node:test";
import {
  createLeaderboardDb,
  leaderboardDb,
} from "../../app/create-db/createLeaderboardDb";
import { Leaderboard } from "../../features/leaderboard/types";
import { deepEqual, strictEqual } from "assert";

describe("LeaderboardDb Unit Tests", () => {
  let leaderboardDb: leaderboardDb;

  beforeEach(() => {
    leaderboardDb = createLeaderboardDb();
  });

  it("should start with an empty leaderboard", async () => {
    const leaderboard = await leaderboardDb.getAll();
    deepEqual(leaderboard, []);
  });

  it("should add a leaderboard post and retrieve it", async () => {
    const mockPost: Leaderboard = {
      leaderboardPostUuid: "uuid-123",
      maxRepetitions: 50,
      username: "user1",
    };

    await leaderboardDb.add(mockPost);

    const leaderboard = await leaderboardDb.getAll();
    deepEqual(leaderboard, [mockPost]);
  });

  it("should return multiple leaderboard posts", async () => {
    const post1: Leaderboard = {
      leaderboardPostUuid: "uuid-123",
      maxRepetitions: 50,
      username: "user1",
    };

    const post2: Leaderboard = {
      leaderboardPostUuid: "uuid-456",
      maxRepetitions: 75,
      username: "user2",
    };

    await leaderboardDb.add(post1);
    await leaderboardDb.add(post2);

    const leaderboard = await leaderboardDb.getAll();
    deepEqual(leaderboard, [post1, post2]);
  });
});
