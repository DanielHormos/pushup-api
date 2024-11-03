import { createApp } from "./app/app";

export function startApp() {
  createApp().listen(3000, () => {
    console.log("App is running on http://localhost:3000");
  });
}

startApp();
