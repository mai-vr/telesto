import { config } from "dotenv"
import { auth } from "../../firebase.js"
import { ERRORS } from "../services/errors.js"

config()

const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - Must include a header that starts with: Bearer'
            })
        }

        const token = header.split(' ')[1]
        const decoded = await auth.verifyIdToken(token)

        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json(ERRORS.AUTH_ERROR)
    }
}

export { authenticate }