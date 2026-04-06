module.exports = () => ({
  name: 'Join',
  triggers: ['join'],
  description: 'Make the bot join a group via invite link',
  category: 'Owner',
  react: '🔗',
  owner: true,
  run: async ({ m, Cypher, args, text, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    if (!text) return m.reply('*Please provide a group invite link!*');
    const arg = args[0] || '';
    if (!arg.includes('chat.whatsapp.com')) return m.reply('*Invalid WhatsApp group link!*');
    try {
      const code = arg.split('https://chat.whatsapp.com/')[1];
      await Cypher.groupAcceptInvite(code);
      m.reply('*Successfully joined the group!*');
    } catch {
      m.reply('*Failed to join. The link may be invalid or expired.*');
    }
  }
});
