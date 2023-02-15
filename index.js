const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require("./options/options");
const token = '5993795467:AAHBUv26aOYhjMzDtniSx2Mspy902qofip0'

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Тебе нужно выбрать загаданный вид НаРкОтэКа, за совпадение, ты получаешь баллы, которые можно обменять в крипто обменнике @spectrabtc")
    const random = Math.floor(Math.random() * 10)
    chats[chatId] = random
    await bot.sendMessage(chatId, "Выбери число", gameOptions)
}

const gameInfo = async (chatId, botNumber, data) => {
    await bot.sendMessage(chatId, `Бот выбрал число: ${botNumber}`)
    await bot.sendMessage(chatId, `Вы выбрали число: ${data}`)
}

const bot = new TelegramApi(token, {polling: true})
const start = async () => {
    await bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация'},
        {command: '/game', description: 'Начать игру'},
    ])

    await bot.on('message', async msg => {
        const chatId = msg.chat.id
        const text = msg.text
        const nick = msg.chat.first_name
        if (text === "/start") {
            return bot.sendMessage(chatId, `Добро пожаловать в DrugBot, ${nick}!`)
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, `Spectra Exchange - @spectrabtc`)
        }
        if (text === "/game") {
            return startGame(chatId)
        } else {
            return bot.sendMessage(chatId, `Неизвестная команда`)
        }
    })

    await bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id
        const msgId = msg.message.message_id
        const data = msg.data
        const botNumber = chats[chatId]

        if (data === "/again") {
            return startGame(chatId)
        }
        if (+data === botNumber) {
            await bot.deleteMessage(chatId, msgId)
            await gameInfo(chatId, botNumber, data)
            return bot.sendMessage(chatId, "Поздравляем, вы отгадали число!", againOptions)
        } else {
            await bot.deleteMessage(chatId, msgId)
            await gameInfo(chatId, botNumber, data)
            return bot.sendMessage(chatId, "К сожалению, вам не повезло.", againOptions)
        }
    })
}

start()