"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRouter = (0, express_1.Router)();
UserRouter.get("/api/users", UserController_1.default.listUsers);
UserRouter.post("/api/user", UserController_1.default.createUser);
UserRouter.patch("/api/user/:id", UserController_1.default.updateUser);
UserRouter.delete("/api/user/:id", UserController_1.default.deleteUser);
exports.default = UserRouter;
