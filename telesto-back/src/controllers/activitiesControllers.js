import { ERRORS } from '../services/errors.js'
import { sendError } from '../services/helpers.js'
import { db } from './firebase.js'

const COLLECTION = 'activities'

const getAllActivities = async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION).get()
        const allActivities = snapshot.docs.map(a => a.data())

        res.status(200).json(allActivities)

    } catch (error) {
        console.log(error)
        return sendError(res, 500, ERRORS.INTERNAL)
    }
}

const getOneActivity = async (req, res) => {
    try {
        const response = await db.collection(COLLECTION).doc(req.params.id).get()

        if (!response.exists) {
            return sendError(res, 404, ERRORS.NOT_FOUND)
        }

        res.status(200).json(response.data())

    } catch (error) {
        console.log(error)
        return sendError(res, 500, ERRORS.INTERNAL)
    }
}

const createActivity = async (req, res) => {
    const { title, startAt, endAt, description, state } = req.body

    if (!title || !startAt || !endAt || !description || !state) {
        return sendError(res, 400, ERRORS.INPUT_REQUIRED)
    }

    try {
        const id = crypto.randomUUID()
        const newActivity = {
            id: id,
            title,
            startAt,
            endAt,
            description,
            state
        }

        await db.collection(COLLECTION).doc(id).set(newActivity)
        res.status(201).json(newActivity)

    } catch (error) {
        console.log(error)
        return sendError(res, 500, ERRORS.INTERNAL)
    }
}

const deleteActivity = async (req, res) => {
    try {
        const foundActivity = db.collection(COLLECTION).doc(req.params.id)
        const snapshot = await foundActivity.get()
        if (!snapshot.exists) {
            return sendError(res, 404, ERRORS.NOT_FOUND)
        }

        await foundActivity.delete()

        res.status(200).json({
            message: 'Delete successfully'
        })

    } catch (error) {
        console.log(error)
        return sendError(res, 500, ERRORS.INTERNAL)
    }
}

const replaceActivity = async (req, res) => {
    const { title, startAt, endAt, description, state } = req.body

    if (!title || !startAt || !endAt || !description || !state) {
        return sendError(res, 400, ERRORS.INPUT_REQUIRED)
    }

    try {
        const foundActivity = db.collection(COLLECTION).doc(req.params.id)
        const snapshot = await foundActivity.get()

        if (!snapshot.exists) {
            return sendError(res, 404, ERRORS.NOT_FOUND)
        }

        const updatedActivity = {
            id: snapshot.data().id,
            title,
            startAt,
            endAt,
            description,
            state
        }

        await foundActivity.set(updatedActivity)
        res.status(200).json(updatedActivity)

    } catch (error) {
        console.log(error)
        return sendError(res, 500, ERRORS.INTERNAL)
    }
}

const updateActivity = async (req, res) => {
    try {
        const foundActivity = db.collection(COLLECTION).doc(req.params.id)
        const snapshot = await foundActivity.get()

        if (!snapshot.exists) {
            return sendError(res, 404, ERRORS.NOT_FOUND)
        }

        const { title, startAt, endAt, description, state } = req.body
        const updateFields = {}

        if (title) updateFields.title = title
        if (startAt) updateFields.startAt = startAt
        if (endAt) updateFields.endAt = endAt
        if (description) updateFields.description = description
        if (state) updateFields.state = state

        await foundActivity.update(updateFields)
        const updateSnapshot = await foundActivity.get()
        res.status(200).json(updateSnapshot.data())

    } catch (error) {
        console.log(error)
        return sendError(res, 500, ERRORS.INTERNAL)
    }
}

export { getAllActivities, getOneActivity, createActivity, deleteActivity, replaceActivity, updateActivity }