import { Router } from "express";
import allControllers from "../controllers/allControllers";

const router = Router();

router.get("/", allControllers.getAllMessages); 
router.get("/:id", allControllers.getMessageById);
router.post("/create", allControllers.createMessagePost);
router.delete("/:id", allControllers.deleteMessageById);

router.get("/:postId/comments", allControllers.getComments)
router.post("/:postId/comments", allControllers.addComment);

router.post("/:postId/like", allControllers.toggleLike);
router.post("/:postId/favorite", allControllers.toggleFavorite);

export default router;
