import {Router} from "express"
// import postRouter from "./postRouter"
import userRouter from "./userRouter"


const router = Router()

// router.use("/", postRouter)
router.use("/user", userRouter)

export default router