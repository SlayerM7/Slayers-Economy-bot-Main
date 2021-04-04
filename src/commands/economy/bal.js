const { slayersDB } = require("slayer.db");
const { Client, Message, MessageEmbed } = require("discord.js");

const db = new slayersDB();

module.exports = {
  name: "ballence",
  cooldown: 3000,
  category: "economy",

  aliases: ["bal"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guild, member } = message;
    let user = message.mentions.users.first() || message.author;
    if (!db.has(`wallet_${guild.id}`)) {
      db.set(`wallet_${guild.id}`, { [`${user.id}`]: 0 });
      return message.reply("User has no ballence 1");
    }
    if (!db.has(`bank_${guild.id}`)) {
      db.set(`bank_${guild.id}`, { [`${user.id}`]: 0 });
      return message.reply("User has no ballence");
    }

    db.save();

    const bank = db.get(`bank_${guild.id}`);
    const wallet = db.get(`wallet_${guild.id}`);

    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
      .setColor("BLUE")
      .addField("Bank", bank[user.id] || 0)
      .addField("Wallet", wallet[user.id]);

    message.channel.send(embed);
  },
};
