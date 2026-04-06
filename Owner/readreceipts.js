module.exports = () => ({
  name: 'ReadReceipts',
  triggers: ['readreceipts'],
  description: 'Toggle read receipts (blue ticks) privacy (all/none)',
  category: 'Owner',
  react: '✅',
  owner: true,
  run: async ({ m, Cypher, args, prefix, command, isCreator }) => {
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    if (!args[0]) return m.reply(`*Options: all/none*\n*Example: ${prefix + command} all*`);
    const valid = ['all', 'none'];
    if (!valid.includes(args[0])) return m.reply('*Invalid option!*');
    await Cypher.updateReadReceiptsPrivacy(args[0]);
    m.reply('*Done!*');
  }
});
