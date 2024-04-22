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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = require("dotenv");
const client_1 = require("@prisma/client");
(0, dotenv_1.config)();
const prisma = new client_1.PrismaClient();
const bot = new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN, { polling: true });
bot.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id.toString();
    const chatIdParam = msg.chat.id;
    const userName = `${msg.chat.first_name} ${msg.chat.last_name}`;
    const messageDate = new Date(msg.date * 1000);
    const hour = messageDate.getHours();
    if (hour >= 9 && hour < 18) {
        const userEmail = yield requestUserEmail(chatIdParam);
        yield saveUserInfo(chatId, userName, userEmail);
    }
    else {
        bot.sendMessage(chatId, 'Estamos fora de horário comercial, volte entre 09:00 e 18:00.');
    }
}));
function requestUserEmail(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield bot.sendMessage(chatId, 'Olá! Por favor, me informe o seu email:');
            return new Promise((resolve, reject) => {
                bot.once('message', (msg) => {
                    if (msg.chat.id === chatId) {
                        const userEmail = msg.text;
                        if (!userEmail) {
                            reject(new Error('Email não fornecido'));
                        }
                        else {
                            resolve(userEmail);
                        }
                    }
                });
            });
        }
        catch (error) {
            throw new Error('Erro ao solicitar email do usuário: ' + error);
        }
    });
}
function saveUserInfo(chatId, userName, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.user.create({
                data: {
                    chatId: chatId,
                    userName: userName,
                    email: email
                }
            });
            console.log(`Informações do usuário ${userName} (${email}) salvas com sucesso.`);
        }
        catch (error) {
            console.error('Erro ao salvar informações do usuário:', error);
        }
    });
}
