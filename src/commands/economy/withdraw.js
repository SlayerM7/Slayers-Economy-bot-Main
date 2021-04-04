const { Client, Message, MessageEmbed } = require("discord.js");

const { slayersDB } = require("slayer.db");

const db = new slayersDB();

module.exports = {
  name: "withdraw",
  aliases: ["with"],
  category: "economy",
  cooldown: 3000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guild, author, content, member } = message;
    let curAmount = 0;
    if (db.has(`bank_${guild.id}`)) {
      if (db.get(`bank_${guild.id}`)[author.id]) {
        curAmount = db.get(`bank_${guild.id}`)[author.id];
      }
    }

    let walAmount = 0;

    if (db.has(`wallet_${guild.id}`)) {
      if (db.get(`wallet_${guild.id}`)[author.id]) {
        walAmount = db.get(`wallet_${guild.id}`)[author.id];
      }
    }

    const amountToDep = args[0];
    if (!amountToDep) return message.reply("You did not put an amount");

    let amountToD = Number(amountToDep);

    if (!amountToD) return message.reply("Amount isn't a Number");

    if (amountToD > curAmount)
      return message.channel.send("HAHA, you dont got enough");

    const walletGuild = db.get(`wallet_${guild.id}`);
    const bankGuild = db.get(`bank_${guild.id}`);

    message.reply(`Withdrawed **${amountToD}**`);

    if (walletGuild) {
      walletGuild[author.id] = walAmount + amountToD;
    } else {
      db.set(`wallet_${guild.id}`, { [`${author.id}`]: walAmount + amountToD });
    }

    if (bankGuild) {
      bankGuild[author.id] = (bankGuild[author.id] || 0) - amountToD;
    } else {
      db.set(`bank_${guild.id}`, { [`${author.id}`]: curAmount - amountToD });
    }

    db.save();
  },
};
