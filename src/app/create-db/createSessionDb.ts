import { Session } from "../../features/session/types";

export interface SessionDb {
  getAll: () => Promise<Session[]>;
  getById: (uuid: string) => Promise<Session | null>;
  add: (session: Session) => Promise<void>;
  delete: (uuid: string) => Promise<void>;
  patch: (uuid: string, updatedData: Partial<Session>) => Promise<void>;
}

export function createSessionDb(): SessionDb {
  const sessions: Session[] = [];

  return {
    getAll: async () => sessions,
    getById: async (uuid: string) => {
      return sessions.find((session) => session.sessionUuid === uuid) || null;
    },
    add: async (session: Session) => {
      sessions.push(session);
    },
    delete: async (uuid: string): Promise<void> => {
      const index = sessions.findIndex(
        (session) => session.sessionUuid === uuid
      );
      if (index === -1) {
        throw new Error("Session not found");
      }
      sessions.splice(index, 1);
    },
    patch: async (
      uuid: string,
      updatedData: Partial<Session>
    ): Promise<void> => {
      const index = sessions.findIndex(
        (session) => session.sessionUuid === uuid
      );
      if (index === -1) {
        throw new Error("Session not found");
      }

      sessions[index] = { ...sessions[index], ...updatedData };
    },
  };
}
