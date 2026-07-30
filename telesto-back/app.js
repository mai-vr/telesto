import express from 'express'
import cors from 'cors'
import { db } from './firebase.js'
import dotenv from 'dotenv'
import { authenticate } from './src/middleware/authMiddleware.js'
import { ActivityRouter } from './src/routes/activitiesRouter.js'
import { errorHandler } from './src/middleware/errorHandler.js'
import { routeErrorHandler } from './src/middleware/routeErrorHandler.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT
let activities = []

app.use(express.json())

// DEFINE VALID URLS TO ACCESS TO THIS API.

app.use('/activities', authenticate, ActivityRouter)
app.use(errorHandler)
app.use(routeErrorHandler)

app.listen(PORT, async () => {
    try {
        const database = await db.collection('activities').limit(1).get()
        if (!database.empty) {
            console.log('User has already some activities to do')
            return
        }

        console.log(`Server listening on http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
    }
})