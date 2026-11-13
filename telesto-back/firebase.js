import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIRESTORE_KEY)

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = getAuth()

export { db, auth }