module.exports = () => ({
  name: 'HideTag',
  triggers: ['hidetag', 'htag'],
  description: 'Silently tag all members (message visible only to sender)',
  category: 'Group',
  react: '👁️',
  owner: true,
  run: async ({ m, Cypher, text, isCreator }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const g = await Cypher.groupMetadata(m.chat).catch(() => null);
    if (!g) return m.reply('*Could not fetch group info.*');
    Cypher.sendMessage(m.chat, {
      text: text || '​',
      mentions: g.participants.map(p => p.id)
    }, { quoted: m });
  }
});
