module.exports = () => ({
  name: 'Delete',
  triggers: ['delete', 'del'],
  description: 'Delete a replied message',
  category: 'Owner',
  react: '🗑️',
  owner: true,
  run: async ({ m, Cypher, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    if (!m.quoted) return m.reply('*Please reply to a message to delete!*');
    try {
      await Cypher.sendMessage(m.chat, {
        delete: {
          remoteJid: m.quoted.fakeObj?.key?.remoteJid || m.chat,
          fromMe: m.quoted.fakeObj?.key?.fromMe,
          id: m.quoted.fakeObj?.key?.id || m.quoted.id,
          participant: m.quoted.fakeObj?.participant || m.quoted.sender,
        }
      });
      await Cypher.sendMessage(m.chat, {
        delete: { remoteJid: m.key.remoteJid, fromMe: m.key.fromMe, id: m.key.id, participant: m.key.participant }
      });
    } catch (e) {
      m.reply('*Failed to delete message.*');
    }
  }
});
