import { checkRole } from "@/middleware/checkRole";
import { Router } from "express";
import allControllers from "src/controllers/allControllers";

const router = Router();

router.get("/", allControllers.getAllMessages); 
router.get("/:postId", allControllers.getMessageById);
router.post("/create", allControllers.createMessagePost);
router.delete("/:id", allControllers.deleteMessageById);

router.get("/:postId/comments", allControllers.getComments)
router.post("/:postId/comments", allControllers.addComment);

router.post("/:postId/like", allControllers.toggleLike);
router.post("/:postId/favorite", allControllers.toggleFavorite);
router.post("/:postId/priority", checkRole('admin'), allControllers.togglePriority);

export default router;
