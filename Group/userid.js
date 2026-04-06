module.exports = () => ({
  name: 'UserID',
  triggers: ['userid', 'userjid'],
  description: 'List all member JIDs in the group',
  category: 'Group',
  react: '🆔',
  owner: true,
  run: async ({ m, Cypher, isCreator }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const g = await Cypher.groupMetadata(m.chat).catch(() => null);
    if (!g) return m.reply('*Could not fetch group info.*');
    let text = `*JIDs in ${g.subject}:*\n\n`;
    for (const p of g.participants) text += `▪ ${p.phoneNumber}\n`;
    m.reply(text);
  }
});
