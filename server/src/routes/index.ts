import {Router} from "express"
import postRouter from "../routes/postRouter"
import userRouter from "../routes/userRouter"


const router = Router()

router.use("/board", postRouter)
router.use("/user", userRouter)

export default router