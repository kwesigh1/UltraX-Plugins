const fetch = require('node-fetch');
module.exports = () => ({
  name: 'ShortURL',
  triggers: ['shorturl', 'shorten'],
  description: 'Shorten a URL using TinyURL',
  category: 'Utility',
  react: '🔗',
  owner: false,
  run: async ({ m, args, prefix, command }) => {
    if (!args[0] || !args[0].startsWith('http')) return m.reply(`*Example: ${prefix + command} https://example.com*`);
    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(args[0])}`);
      const short = await res.text();
      m.reply(`*Shortened URL:*\n${short}`);
    } catch {
      m.reply('*Could not shorten URL. Try again!*');
    }
  }
});
