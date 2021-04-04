const shop = require("../../handlers/shop");
const { slayersDB } = require("slayer.db");
const { Client, Message, MessageEmbed, Guild } = require("discord.js");

const db = new slayersDB();
module.exports = {
  name: "inventory",
  category: "economy",
  cooldown: 3000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let items = [];
    const { guild, author } = message;
    Object.keys(shop).map((xx) => {
      items.push(`${xx}`);
    });

    let str = "";

    let amt = 0;

    items.forEach((item) => {
      if (db.has(`${item}_${guild.id}`)) {
        if (db.get(`${item}_${guild.id}`)[author.id]) {
          amt++;
          str += `\nYou bought **${item}** for **${shop[item].price}**`;
        }
      }
    });

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(author.username, author.displayAvatarURL({ dynamic: true }))
      .setDescription(str)
      .setFooter(`You bought ${amt} items`);
    message.channel.send(embed);
  },
};
