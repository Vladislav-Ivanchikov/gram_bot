module.exports = {
    againOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Начать заново', callback_data: '/again'}]
            ]
        })
    },
    gameOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Гаш', callback_data: 'Гаш'}, {text: 'Шишка', callback_data: 'Шишка'}, {text: 'Гречка', callback_data: 'Гречка'}, {text: 'Мёд', callback_data: 'Мёд'}, {text: 'Амф', callback_data: 'Амф'}],
                [{text: 'Собака', callback_data: 'Собака'}, {text: 'План', callback_data: 'План'}, {text: 'ЛСД', callback_data: 'ЛСД'}, {text: '2C-B', callback_data: '2C-B'}, {text: 'Мех', callback_data: 'Мех'}]
            ]
        })
    }
}

