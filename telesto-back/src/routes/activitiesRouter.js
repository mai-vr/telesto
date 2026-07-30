import { Router } from "express"
import { getAllActivities, getOneActivity, createActivity, deleteActivity, replaceActivity, updateActivity } from "../controllers/ActivitiesControllers.js"

const ActivityRouter = Router()

ActivityRouter.get('/', getAllActivities)
ActivityRouter.get('/:id', getOneActivity)
ActivityRouter.post('/', createActivity)
ActivityRouter.delete('/:id', deleteActivity)
ActivityRouter.put('/:id', replaceActivity)
ActivityRouter.patch('/:id', updateActivity)

export { ActivityRouter }