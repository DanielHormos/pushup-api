# pushup-api
Pushup tracker and leaderboard API
This is a TypeScript-based API for tracking push-up sessions and maintaining a leaderboard of users with the highest push-up counts. Built as a weekend project, it includes two main features:
- Push-Up Sessions: Allows users to log their push-up sessions.
- Leaderboard: Maintains a leaderboard of users with their highest recorded push-ups.


Tech Stack
Language: TypeScript
Framework: Express.js
Testing: Node.js Test Runner, Supertest
Data Validation: Zod
UUID Generation: uuid library


Features:
Push-Up Sessions

- POST /api/sessions: Create a new push-up session.

- GET /api/sessions: Retrieve all push-up sessions.

- GET /api/sessions/:id: Retrieve a specific session by ID.

- PATCH /api/sessions/:id: Update an existing session by ID.

- DELETE /api/sessions/:id: Delete a session by ID.


Leaderboard:

- POST /api/leaderboard: Add a new leaderboard entry.

- GET /api/leaderboard: Retrieve all leaderboard entries.


Big picture plan
![image](https://github.com/user-attachments/assets/24b2721c-dc86-4dc9-9b70-47a080e1340b)

Project planboard
https://github.com/users/DanielHormos/projects/3
