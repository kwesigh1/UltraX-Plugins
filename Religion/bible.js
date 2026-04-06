const fetch = require('node-fetch');
module.exports = () => ({
  name: 'Bible',
  triggers: ['bible'],
  description: 'Get a Bible verse (e.g. John 3:16)',
  category: 'Religion',
  react: '✝️',
  owner: false,
  run: async ({ m, args, prefix, command }) => {
    const q = args.join('').trim();
    if (!q) return m.reply(`*Example: ${prefix + command} John 3:16*`);
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error('Verse not found');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const text = `*The Holy Bible*\n\n*${data.reference}*\nTranslation: ${data.translation_name}\nVerses: ${data.verses.length}\n\n${data.text.trim()}`;
      m.reply(text);
    } catch (e) {
      m.reply(`*Error:* ${e.message}\n\n*Example: ${prefix + command} John 3:16*`);
    }
  }
});
