module.exports = () => ({
  name: 'TagAll',
  triggers: ['tagall'],
  description: 'Tag all members in the group',
  category: 'Group',
  react: '📣',
  owner: true,
  run: async ({ m, Cypher, text, isCreator }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const groupMeta = await Cypher.groupMetadata(m.chat).catch(() => null);
    if (!groupMeta) return m.reply('*Could not fetch group info.*');
    const parts = groupMeta.participants;
    let msg = `*TAGGED BY:* @${m.sender.split('@')[0]}\n*MESSAGE:* ${text || 'No message'}\n\n`;
    for (const mem of parts) msg += `@${mem.id.split('@')[0]}\n`;
    Cypher.sendMessage(m.chat, { text: msg, mentions: parts.map(p => p.id) }, { quoted: m });
  }
});
