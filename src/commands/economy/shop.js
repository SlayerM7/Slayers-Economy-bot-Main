const shop = require("../../handlers/shop");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "shop",
  cooldown: 5000,
  category: "economy",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let str = "";
    Object.keys(shop).map((key, i) => {
      str += `\n${i + 1}) ${key} - ${shop[key].price}`;
    });

    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("RED")
        .setDescription(str)
    );
  },
};
