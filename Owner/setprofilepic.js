module.exports = () => ({
  name: 'SetProfilePic',
  triggers: ['setprofilepic', 'setpp'],
  description: 'Set the bot profile picture',
  category: 'Owner',
  react: '🖼️',
  owner: true,
  run: async ({ m, Cypher, prefix, command, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const quoted = m.quoted;
    if (!quoted) return m.reply(`*Reply to an image with ${prefix + command}*`);
    const mime = quoted.mimetype || '';
    if (!/image/.test(mime) || /webp/.test(mime)) return m.reply('*Please reply to a JPEG/PNG image!*');
    try {
      const buffer = await quoted.download();
      const botId = Cypher.user?.id;
      await Cypher.updateProfilePicture(botId, buffer);
      m.reply('*Profile picture updated!*');
    } catch (e) {
      m.reply('*Failed to update profile picture.*');
    }
  }
});
