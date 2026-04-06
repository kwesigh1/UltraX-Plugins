module.exports = () => ({
  name: 'ToViewOnce',
  triggers: ['toviewonce', 'tovo', 'tovv'],
  description: 'Convert a media to a view-once message',
  category: 'Owner',
  react: '👁️',
  owner: true,
  run: async ({ m, Cypher, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const quoted = m.quoted;
    if (!quoted) return m.reply('*Reply to an Image or Video!*');
    const mime = quoted.mimetype || '';
    try {
      const buffer = await quoted.download();
      if (/image/.test(mime)) {
        await Cypher.sendMessage(m.chat, { image: buffer, caption: '✅', viewOnce: true, fileLength: '999' }, { quoted: m });
      } else if (/video/.test(mime)) {
        await Cypher.sendMessage(m.chat, { video: buffer, caption: '✅', viewOnce: true, fileLength: '99999999' }, { quoted: m });
      } else if (/audio/.test(mime)) {
        await Cypher.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg', ptt: true, viewOnce: true }, { quoted: m });
      } else {
        m.reply('*Unsupported media type!*');
      }
    } catch (e) {
      m.reply('*Failed to convert to view-once.*');
    }
  }
});
