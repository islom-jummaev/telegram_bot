const TelegramBot = require('node-telegram-bot-api');

// Botni tokeni bilan botni yaratish
const bot = new TelegramBot('6713995168:AAGTnytZQxONwL5fqXaz7sMKDKUcljKCT58', { polling: true });

// Kanalni identifikatorlarini aniqlash
const sourceChannelId = '-1002026251207'; // Bot yuborilgan xabarlarni olish uchun
const destinationChannelId = '5515654238'; // Xabarlarni jo'natish uchun kerakli kanal

// Xabarlar kuzatish
bot.on('message', (msg) => {
    // Agar xabar bot yuborilgan kanalda yuborilgan bo'lsa
    if (msg.chat.id == sourceChannelId) {
        // Yuborilgan xabarni kerakli kanalga jo'natish
        bot.forwardMessage(destinationChannelId, msg.chat.id, msg.message_id)
            .then(() => {
                console.log('Xabar muvaffaqiyatli jo\'natildi');
            })
            .catch((error) => {
                console.error('Xabar jo\'natishda xatolik:', error.response.body);
            });

        // Agar kerak bo'lsa, botdan yuborilgan xabarga javob yuborish
        const messageToSend = msg.text; // Yuborilgan xabarni o'z ichiga olish
        bot.sendMessage(destinationChannelId, messageToSend); // Xabarlar kanaliga javob yuborish
    } else {
        bot.sendMessage(sourceChannelId, msg.text); // Boshqa xabarlarga javob yuborish
    }
});

// Xatoliklarni konsolga yozish
bot.on('polling_error', (error) => {
    console.error(error);
});
