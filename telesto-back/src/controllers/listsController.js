import { ERRORS } from "../services/errors";
import { sendError } from "../services/helpers";
import { db } from "../../firebase";

const COL = "lists";
const SUBCOL = "items";

const getAllLists = async (req, res) => {
  PREVIEW_SIZE = 3;
  ORDER = "createdAt";
  try {
    const snapshot = await db.collection(COL).get();

    const allLists = await Promise.all(
      snapshot.docs.map(async (list) => {
        const itemSnapshot = await list.ref
          .collection(SUBCOL)
          .orderBy(ORDER)
          .limit(PREVIEW_SIZE)
          .get();

        const items = itemSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
      }),
    );

    res.status(200).json(allLists);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const getOneList = async (req, res) => {
  try {
    const { id } = req.params;
    const listRef = db.collection(COL).doc(id);
    const response = await listRef.get();

    if (!response.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    const itemSnapshot = await listRef.collection(SUBCOL).get();
    const items = itemSnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    res.status(200).json({
      id: response.id,
      ...response.data(),
      items,
    });
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const createList = async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    return sendError(res, 400, ERRORS.INPUT_REQUIRED);
  }

  try {
    const id = crypto.randomUUID();
    const newList = {
      id: id,
      title,
      description,
      category,
    };

    await db.collection(COL).doc(id).set(newList);
    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const deleteList = async (req, res) => {
  try {
    const foundList = db.collection(COL).doc(req.params.id);
    const snapshot = await foundList.get();

    if (!snapshot.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    await foundList.delete();

    res.status(200).json({
      message: "Delete successfully",
    });
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const updateList = async (req, res) => {
  try {
    const foundList = db.collection(COL).doc(req.params.id);
    const snapshot = await foundList.get();

    if (!snapshot.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    const { title, description, category } = req.body;
    const updateFields = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (category) updateFields.category = category;

    await foundList.update(updateFields);
    const updateSnapshot = await foundList.get();

    res.status(200).json(updateSnapshot.data());
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

export { getAllLists, getOneList, createList, deleteList, updateList };
