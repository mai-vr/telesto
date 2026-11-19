import { ERRORS } from "../services/errors";
import { sendError } from "../services/helpers";
import { db } from "../../firebase";

USER_COL = "users";
CATEGORY_COL = "categories";

getAllCategories = async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection(USER_COL)
      .doc(userId)
      .collection(CATEGORY_COL)
      .get();
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const createCategory = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { name } = req.body;

    if (!name) return sendError(res, 400, ERRORS.INPUT_REQUIRED);

    const id = crypto.randomUUID();
    const newCategory = {
      id: id,
      name,
    };

    await db
      .collection(USER_COL)
      .doc(userId)
      .collection(CATEGORY_COL)
      .doc(id)
      .set(newCategory);

    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const deleteCategory = async (req, res) => {
  const userId = req.user.uid;
  const { id } = req.params;

  try {
    const foundCategory = db
      .collection(USER_COL)
      .doc(userId)
      .collection(CATEGORY_COL)
      .doc(id);
    const snapshot = await foundCategory.get();

    if (!snapshot.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    await foundCategory.delete();

    res.status(200).json({ messasge: "Delete successfully" });
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

export { getAllCategories, createCategory, deleteCategory };
