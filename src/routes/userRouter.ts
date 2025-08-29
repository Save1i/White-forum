import allControllers from "../controllers/allControllers"
import {Router} from "express"

const router = Router()

router.post("/create", allControllers.createUser)

export default router