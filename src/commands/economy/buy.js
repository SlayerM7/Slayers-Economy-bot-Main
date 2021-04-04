const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const shop = require("../../handlers/shop");
const { slayersDB } = require("slayer.db");

const db = new slayersDB();

module.exports = {
  name: "buy",
  cooldown: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guild, author } = message;
    const toBuy = args[0];
    if (!toBuy)
      return message.channel.send(
        "You didn't say what you wanted to buy, retard"
      );

    let wll = db.get(`wallet_${guild.id}`);

    let curWllt = 0;

    if (wll) {
      if (wll[author.id]) {
        curWllt = wll[author.id];
      }
    }

    let items = [];

    Object.keys(shop).map((x) => items.push(x));

    let item = shop[toBuy];

    if (!items.includes(toBuy))
      return message.channel.send("That item doesn't exist dumbass");

    if (item.price > curWllt)
      return message.channel.send("Bro.. You dont got enough ");

    if (!db.has(`${toBuy.toLowerCase()}_${guild.id}`)) {
      db.set(`${toBuy.toLowerCase()}_${guild.id}`, { [`${author.id}`]: true });
    } else {
      let xx = db.get(`${toBuy.toLowerCase()}_${guild.id}`);

      if (xx[author.id])
        return message.reply(`Uhm- , Yoy already own a **${toBuy}**`);

      xx[author.id] = true;
    }

    message.channel.send(
      `You have bought a **${toBuy}** for **${item.price}**`
    );

    if (wll) {
      wll[author.id] = wll[author.id] - item.price;
    } else;
    db.save();
  },
};
