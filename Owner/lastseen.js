module.exports = () => ({
  name: 'LastSeen',
  triggers: ['lastseen'],
  description: 'Set last-seen privacy (all/contacts/contact_blacklist/none)',
  category: 'Owner',
  react: '👁️',
  owner: true,
  run: async ({ m, Cypher, args, prefix, command, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    if (!args[0]) return m.reply(`*Options: all/contacts/contact_blacklist/none*\n*Example: ${prefix + command} all*`);
    const valid = ['all', 'contacts', 'contact_blacklist', 'none'];
    if (!valid.includes(args[0])) return m.reply('*Invalid option!*');
    await Cypher.updateLastSeenPrivacy(args[0]);
    m.reply('*Done!*');
  }
});
