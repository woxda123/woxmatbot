require("dotenv").config();
const { Bot, InlineKeyboard } = require("grammy");

const bot = new Bot(process.env.BOT_TOKEN);
const WEBAPP_URL = process.env.WEBAPP_URL;

if (!process.env.BOT_TOKEN || !WEBAPP_URL) {
  console.error("Заполните BOT_TOKEN и WEBAPP_URL в файле .env");
  process.exit(1);
}

bot.api.setChatMenuButton({
  menu_button: { type: "web_app", text: "♟ Играть", web_app: { url: WEBAPP_URL } },
}).catch(console.error);

bot.command("start", async (ctx) => {
  const code = ctx.match;
  const kb = new InlineKeyboard();
  if (code) {
    kb.url("⚔️ Принять вызов", `http://t.me/woxmat_bot/play?startapp=${code}`);
    return ctx.reply("Вас приглашают сыграть в Wox Mat!", { reply_markup: kb });
  }
  kb.webApp("♟ Играть в Wox Mat", WEBAPP_URL);
  await ctx.reply(
    "Добро пожаловать в Wox Mat! ♞\nИграйте с ботом или с друзьями онлайн, решайте задачи и растите рейтинг.",
    { reply_markup: kb }
  );
});

bot.catch((e) => console.error("Ошибка:", e.message));
bot.start();
console.log("Wox Mat bot запущен");
