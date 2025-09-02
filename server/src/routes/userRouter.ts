import allControllers from "src/controllers/allControllers"
import {Router} from "express"
import passport from "passport"

const router = Router()

router.post("/create", allControllers.createUser)
router.post("/log-in", passport.authenticate('local', {
    successRedirect: '/board',
    failureMessage: true,
    failureRedirect: '/user/log-in',
    failureFlash: false
}))
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ success: true, message: "successful log out" });
  });
});
router.get("/name/:username", allControllers.getUserByName);
router.get("/me", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {

    return res.json(req.user);
  }
  res.status(401).json({ message: "Not authenticated" });
});
router.get("/:id", allControllers.getOneUserById);       
router.put("/:id", allControllers.updateUser);
router.get("/", allControllers.getAllUsers);



export default router