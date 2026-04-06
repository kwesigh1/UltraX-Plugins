const fetch = require('node-fetch');
module.exports = () => ({
  name: 'ColorCode',
  triggers: ['color', 'colorcode', 'hex'],
  description: 'Get info and preview of a hex color. Usage: color #FF5733',
  category: 'Utility',
  react: '🎨',
  owner: false,
  run: async ({ m, Cypher, args, prefix, command }) => {
    if (!args[0]) return m.reply(`*Example: ${prefix + command} #FF5733*`);
    const hex = args[0].replace('#', '').trim();
    if (!/^[0-9a-fA-F]{3,6}$/.test(hex)) return m.reply('*Invalid hex color code! Example: #FF5733*');
    try {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const imgUrl = `https://singlecolorimage.com/get/${hex}/200x200`;
      const text = `*Color: #${hex.toUpperCase()}*\n\n*RGB:* rgb(${r}, ${g}, ${b})\n*Hex:* #${hex.toUpperCase()}`;
      await Cypher.sendMessage(m.chat, { image: { url: imgUrl }, caption: text }, { quoted: m });
    } catch {
      m.reply('*Could not generate color preview.*');
    }
  }
});
