import express from "express";
import cors from "cors";
import { db } from "./firebase.js";
import dotenv from "dotenv";
import { authenticate } from "./src/middleware/authMiddleware.js";
import { ActivityRouter } from "./src/routes/activitiesRouter.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { routeErrorHandler } from "./src/middleware/routeErrorHandler.js";
import { ListRouter } from "./src/routes/listsRouter.js";
import { CategoryRouter } from "./src/routes/categoriesRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
let activities = [];

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);

// DEFINE VALID URLS TO ACCESS TO THIS API.

app.use("/activities", authenticate, ActivityRouter);
app.use("/lists", authenticate, ListRouter);
app.use("/categories", authenticate, CategoryRouter);
app.use(errorHandler);
app.use(routeErrorHandler);

app.listen(PORT, async () => {
  try {
    const database = await db.collection("activities").limit(1).get();
    const dbLists = await db.collection("lists").limit(1).get();

    if (!database.empty) {
      console.log("User has already some activities to do");
      return;
    }

    if (!dbLists.empty) {
      console.log("There are already lists to complete");
      return;
    }

    console.log(`Server listening on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
