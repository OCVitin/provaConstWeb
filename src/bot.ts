import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

config();

const prisma = new PrismaClient();
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id.toString();
    const chatIdParam = msg.chat.id;
    const userName = `${msg.chat.first_name} ${msg.chat.last_name}`;
    const messageDate = new Date(msg.date * 1000);
  
    const hour = messageDate.getHours();
    if (hour >= 9 && hour < 18) {
      const userEmail = await requestUserEmail(chatIdParam);
      await saveUserInfo(chatId, userName, userEmail);
    } else {
        bot.sendMessage(chatId, 'Estamos fora de horário comercial, volte entre 09:00 e 18:00.');
    }
  });
  
  async function requestUserEmail(chatId: number): Promise<string> {
    try {
      await bot.sendMessage(chatId, 'Olá! Por favor, me informe o seu email:');
      return new Promise<string>((resolve, reject) => {
        bot.once('message', (msg) => {
          if (msg.chat.id === chatId) {
            const userEmail = msg.text;
            if (!userEmail) {
              reject(new Error('Email não fornecido'));
            } else {
              resolve(userEmail);
            }
          }
        });
      });
    } catch (error) {
      throw new Error('Erro ao solicitar email do usuário: ' + error);
    }
  }
  
  async function saveUserInfo(chatId: string, userName: string, email: string) {
    try {
      await prisma.user.create({
        data: {
          chatId: chatId,
          userName: userName,
          email: email
        } as Prisma.UserCreateInput
      });
      console.log(`Informações do usuário ${userName} (${email}) salvas com sucesso.`);
    } catch (error) {
      console.error('Erro ao salvar informações do usuário:', error);
    }
  }