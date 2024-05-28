import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const UserRouter = Router();

UserRouter.get("/api/users", AuthMiddlewares.auth, UserController.listUsers);

UserRouter.post("/api/user", UserController.createUser);

UserRouter.patch("/api/user/:id", UserController.updateUser);

UserRouter.delete("/api/user/:id", UserController.deleteUser);

export default UserRouter;