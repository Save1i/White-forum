import {Router} from "express"
import postRouter from "src/routes/postRouter"
import userRouter from "src/routes/userRouter"


const router = Router()

router.use("/board", postRouter)
router.use("/user", userRouter)

export default router