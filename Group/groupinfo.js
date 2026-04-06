module.exports = () => ({
  name: 'GroupInfo',
  triggers: ['groupinfo', 'ginfo'],
  description: 'Display detailed information about the group',
  category: 'Group',
  react: 'ℹ️',
  owner: false,
  run: async ({ m, Cypher }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    const g = await Cypher.groupMetadata(m.chat).catch(() => null);
    if (!g) return m.reply('*Could not fetch group info.*');
    const admins = g.participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`).join(', ');
    const owner = g.owner ? g.owner.split('@')[0] : 'Unknown';
    const text = `*Group Info*\n\n` +
      `*Name:* ${g.subject}\n` +
      `*ID:* ${m.chat}\n` +
      `*Owner:* ${owner}\n` +
      `*Created:* ${new Date(g.creation * 1000).toLocaleDateString()}\n` +
      `*Members:* ${g.participants.length}\n` +
      `*Admins:* ${admins || 'None'}\n` +
      `*Description:* ${g.desc || 'No description'}`;
    Cypher.sendMessage(m.chat, { text, mentions: g.participants.filter(p => p.admin).map(p => p.id) }, { quoted: m });
  }
});
