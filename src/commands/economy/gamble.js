const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const { slayersDB } = require("slayer.db");
const db = new slayersDB();

module.exports = {
  name: "gamble",
  cooldown: 10000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let winOrNot = Math.floor(Math.random() * 10);

    const { guild, author } = message;

    let ix = args[0];
    if (!ix) return message.channel.send("Put how much u wanna put in dumbass");

    let amount = Number(ix);
    if (!amount) return message.channel.send("Uhm.. Amount is not a number");

    let curWllt = 0;
    if (db.has(`wallet_${guild.id}`)) {
      let x = db.get(`wallet_${guild.id}`);

      if (x[author.id]) {
        curWllt = x[author.id];
      }
    }

    if (amount > curWllt)
      return message.reply(
        `You dont got that much dumbass, You got **${curWllt}** in your wallet`
      );
    let Amount = Math.floor(
      Math.random() * amount * Math.floor(Math.random() * 5)
    );

    let wall = db.get(`wallet_${guild.id}`);

    if (Amount < amount) {
      if (wall) {
        wall[author.id] = (wall[author.id] || 0) - Amount;
      }
    } else {
      if (wall) {
        wall[author.id] = (wall[author.id] || 0) + Amount;
      }
    }

    message.channel.send(
      `You gambled **${amount}** and the gamble came out as **${Amount}** `
    );

    db.save();
  },
};
