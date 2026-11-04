import express from "express";
import cors from "cors";
import path from "path";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import notesRoute from "./routes/notes.route.js";
import { rateLimiter } from "./middleware/rateLimiter.middleware.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(rateLimiter);

app.use("/api/notes", notesRoute);

const __dirname = path.resolve();

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = ENV.PORT || 5001;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
};

startServer();
