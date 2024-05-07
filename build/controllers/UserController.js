"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDataBaseService_1 = __importDefault(require("../services/UserDataBaseService"));
class UserController {
    constructor() { }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserDataBaseService_1.default.listDBUsers();
                res.json({
                    status: "ok",
                    users: users,
                });
            }
            catch (error) {
                console.log(error);
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            console.log(body);
            if (!body.email || !body.name) {
                res.json({
                    status: "error",
                    message: "Falta parâmetros",
                });
            }
            try {
                const newuser = yield UserDataBaseService_1.default.insertDBUser({
                    name: body.name,
                    email: body.email,
                });
                res.json({
                    status: "ok",
                    newuser: newuser,
                });
            }
            catch (error) {
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const updatedUser = yield UserDataBaseService_1.default.updateDBUser({
                    name: name,
                    email: email,
                }, parseInt(id));
                res.json({
                    status: "ok",
                    newuser: updatedUser,
                });
            }
            catch (error) {
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.json({
                    status: "error",
                    message: "Faltou o ID",
                });
            }
            try {
                const response = yield UserDataBaseService_1.default.deleteDBUser(parseInt(id));
                if (response) {
                    res.json({
                        status: "ok",
                        message: "usuário deletado com sucesso",
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
}
exports.default = new UserController();
