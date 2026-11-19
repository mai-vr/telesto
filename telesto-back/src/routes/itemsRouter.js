import { Router } from "express";
import {
  getAllItems,
  getOneItem,
  createItem,
  deleteItem,
  updateItem,
} from "../controllers/itemsController.js";

const ItemsRouter = Router({ mergeParams: true }); // Hereda los parámetros de la ruta padre (listas).

ItemsRouter.get("/", getAllItems);
ItemsRouter.get("/:id", getOneItem);
ItemsRouter.post("/", createItem);
ItemsRouter.delete("/:id", deleteItem);
ItemsRouter.patch("/:id", updateItem);

export { ItemsRouter };
