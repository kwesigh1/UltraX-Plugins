const fetch = require('node-fetch');
module.exports = () => ({
  name: 'Timezone',
  triggers: ['timezone'],
  description: 'Get the current time in any timezone. Usage: timezone Africa/Lagos',
  category: 'Utility',
  react: '🕐',
  owner: false,
  run: async ({ m, args, prefix, command }) => {
    if (!args[0]) return m.reply(`*Example: ${prefix + command} Africa/Lagos*`);
    const tz = args.join('/');
    try {
      const now = new Date().toLocaleString('en-US', { timeZone: tz, dateStyle: 'full', timeStyle: 'long' });
      m.reply(`*Time in ${tz}:*\n${now}`);
    } catch {
      m.reply('*Invalid timezone! Example: Africa/Lagos, America/New_York, Asia/Tokyo*');
    }
  }
});
