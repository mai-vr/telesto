import { Router } from "express";
import { getAllCategories } from "../controllers/categoriesController.js";

const CategoryRouter = Router();

CategoryRouter.get("/", getAllCategories);

export { CategoryRouter };
