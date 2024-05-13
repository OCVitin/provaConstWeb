import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";

class UserController {
  constructor() {}

  async listUsers(req: Request, res: Response) {
    try {
      const users = await UserDataBaseService.listDBUsers();
      res.json({
        status: "ok",
        users: users,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.email || !body.name) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const newuser = await UserDataBaseService.insertDBUser({
        userName: body.name,
        email: body.email,
        chatId: body.chatId,
      });
      res.json({
        status: "ok",
        newuser: newuser,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    const { name, email } = req.body;
    if (!email || !name) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const updatedUser = await UserDataBaseService.updateDBUser(
        {
          userName: name,
          email: email,
        },
        id
      );
      res.json({
        status: "ok",
        newuser: updatedUser,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    try {
      const response = await UserDataBaseService.deleteDBUser(id);
      if (response) {
        res.json({
          status: "ok",
          message: "usuário deletado com sucesso",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new UserController();