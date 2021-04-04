const { Client, Message, MessageEmbed } = require("discord.js");

const { slayersDB } = require("slayer.db");

const db = new slayersDB();

module.exports = {
  name: "daily",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let stop = false;
    let { guild, author, member } = message;
    if (db.has(`daily_${guild.id}`)) {
      if (db.get(`daily_${guild.id}`)[author.id]) {
        let xx = db.get(`daily_${guild.id}`)[author.id];
        if (xx.go !== true) {
          if (new Date().getDay() + 1 === xx.day) {
            xx.go = true;
          } else {
            stop = true;
          }
        }
      }
    }
    if (stop === true) return message.reply("You are on daily cooldown");

    let xxxxxx = db.get(`daily_${guild.id}`);

    let Amount = Math.floor(Math.random() * 10000);

    let wallet = db.get(`wallet_${guild.id}`);

    if (wallet) {
      wallet[author.id] = wallet[author.id] + Amount;
    } else {
      wallet.set(`wallet_${guild.id}`, { [`${author.id}`]: Amount });
    }

    message.reply(`You have claimed your daily prize of **${Amount}**`);

    if (xxxxxx) {
      xxxxxx[author.id] = new Date().getDay();
    } else {
      db.set(`daily_${guild.id}`, {
        [`${author.id}`]: { date: new Date().getDay(), go: false },
      });
    }
    db.save();
  },
};
