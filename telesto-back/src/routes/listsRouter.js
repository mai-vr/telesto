import { Router } from "express";
import {
  getAllLists,
  getOneList,
  createList,
  deleteList,
  updateList,
} from "../controllers/listsController";
import { ItemsRouter } from "./itemsRouter";

const ListRouter = Router();

ListRouter.get("/", getAllLists);
ListRouter.get("/:id", getOneList);
ListRouter.post("/", createList);
ListRouter.delete("/:id", deleteList);
ListRouter.patch("/:id", updateList);

ListRouter.use("/:listId/items", ItemsRouter);

export { ListRouter };
