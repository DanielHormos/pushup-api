import { createApp } from "./app/session-app";
import { createApp } from "./app/leaderboard-app";

export function startApp() {
  createApp().listen(3000, () => {
    console.log("App is running on http://localhost:3000");
  });
}

startApp();
