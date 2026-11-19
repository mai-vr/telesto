import { ERRORS } from "../services/errors";
import { sendError } from "../services/helpers";
import { db } from "../../firebase";

const COL = "lists";
const SUBCOL = "items";

const listExists = async (listId) => {
  // Verifies if the list exists so there are no items without a list.
  const list = await db.collection(COL).doc(listId).get();
  return list.exists;
};

const getAllItems = async (req, res) => {
  try {
    const { listId } = req.params;

    const exist = await listExists(listId);
    if (!exist) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    const snapshot = await db
      .collection(COL)
      .doc(listId)
      .collection(SUBCOL)
      .get();

    const allItems = snapshot.docs.map((i) => ({
      id: i.id,
      ...i.data(),
    }));

    res.status(200).json(allItems);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const getOneItem = async (req, res) => {
  try {
    const { listId, id } = req.params;

    const exist = await listExists(listId);
    if (!exist) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    const response = await db
      .collection(COL)
      .doc(listId)
      .collection(SUBCOL)
      .doc(id)
      .get();

    if (!response.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    res.status(200).json(response.data());
  } catch (error) {
    console.log(error);
  }
};

const createItem = async (req, res) => {
  const { listId } = req.params;
  const { title, description, score } = req.body;
  if (!title || !description) {
    return sendError(res, 400, ERRORS.INPUT_REQUIRED);
  }

  try {
    const exist = await listExists(listId);
    if (!exist) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }
    const id = crypto.randomUUID();
    const newItem = {
      id: id,
      title,
      description,
      score,
      createdAt: Date.now(),
    };

    await db
      .collection(COL)
      .doc(listId)
      .collection(SUBCOL)
      .doc(id)
      .set(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const deleteItem = async (req, res) => {
  const { listId, id } = req.params;
  try {
    const exist = await listExists(listId);
    if (!exist) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }
    const foundItem = db.collection(COL).doc(listId).collection(SUBCOL).doc(id);
    const snapshot = await foundItem.get();

    if (!snapshot.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    await foundItem.delete();

    res.status(200).json({
      message: "Delete successfully",
    });
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

const updateItem = async (req, res) => {
  const { listId, id } = req.params;
  try {
    const exist = await listExists(listId);
    if (!exist) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }
    const foundItem = db.collection(COL).doc(listId).collection(SUBCOL).doc(id);
    const snapshot = await foundItem.get();

    if (!snapshot.exists) {
      return sendError(res, 404, ERRORS.NOT_FOUND);
    }

    const { title, description, score } = req.body;
    const updateFields = {};

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (score) updateFields.score = score;

    await foundItem.update(updateFields);
    const updateSnapshot = await foundItem.get();

    res.status(200).json(updateSnapshot.data());
  } catch (error) {
    console.log(error);
    return sendError(res, 500, ERRORS.INTERNAL);
  }
};

export { getAllItems, getOneItem, createItem, deleteItem, updateItem };
