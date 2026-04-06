module.exports = () => ({
  name: 'Add',
  triggers: ['add'],
  description: 'Add a member to the group',
  category: 'Group',
  react: '➕',
  owner: true,
  run: async ({ m, Cypher, args, text, prefix, command, isCreator }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const target = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    if (!target || target === '@s.whatsapp.net') return m.reply(`*Example: ${prefix + command} 2348012345678*`);
    await Cypher.groupParticipantsUpdate(m.chat, [target], 'add');
    m.reply('*Done!*');
  }
});
