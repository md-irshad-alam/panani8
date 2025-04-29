import express from "express";
const postRouter = express.Router();
import controller from "../Controller/Auth/auth.js";
import postController from "../Controller/post/postcontroller.js";
import authMiddleware from "../Middleware/authMiddleware.js";
postRouter.post("/register", controller.registerUser);
postRouter.post("/login", controller.loginUser);
postRouter.post("/create/post", authMiddleware, postController.createPost);
postRouter.post("/post/like/:id", authMiddleware, postController.likePost);
postRouter.get("/post/getAll", authMiddleware, postController.getAllPosts);
postRouter.put("/post/update/:id", authMiddleware, postController.updatePost);
postRouter.delete(
  "/post/delete/:id",
  authMiddleware,
  postController.deletePost
);
postRouter.post(
  "/post/comment/:id",
  authMiddleware,
  postController.commentOnPost
);

export default postRouter;
