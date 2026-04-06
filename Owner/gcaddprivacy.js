module.exports = () => ({
  name: 'GCAddPrivacy',
  triggers: ['gcaddprivacy'],
  description: 'Set who can add the bot to groups (all/contacts/contact_blacklist)',
  category: 'Owner',
  react: '🔒',
  owner: true,
  run: async ({ m, Cypher, args, prefix, command, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    if (!args[0]) return m.reply(`*Options: all/contacts/contact_blacklist*\n*Example: ${prefix + command} all*`);
    const valid = ['all', 'contacts', 'contact_blacklist'];
    if (!valid.includes(args[0])) return m.reply('*Invalid option!*');
    await Cypher.updateGroupsAddPrivacy(args[0]);
    m.reply('*Done!*');
  }
});
