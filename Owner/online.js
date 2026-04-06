module.exports = () => ({
  name: 'Online',
  triggers: ['online'],
  description: 'Set online status privacy (all/match_last_seen)',
  category: 'Owner',
  react: '🟢',
  owner: true,
  run: async ({ m, Cypher, args, prefix, command, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    if (!args[0]) return m.reply(`*Options: all/match_last_seen*\n*Example: ${prefix + command} all*`);
    const valid = ['all', 'match_last_seen'];
    if (!valid.includes(args[0])) return m.reply('*Invalid option!*');
    await Cypher.updateOnlinePrivacy(args[0]);
    m.reply('*Done!*');
  }
});
