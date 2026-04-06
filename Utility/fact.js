const fetch = require('node-fetch');
module.exports = () => ({
  name: 'Fact',
  triggers: ['fact', 'funfact'],
  description: 'Get a random fun fact',
  category: 'Utility',
  react: '🧠',
  owner: false,
  run: async ({ m }) => {
    try {
      const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      const data = await res.json();
      m.reply(`*Fun Fact:*\n\n${data.text}`);
    } catch {
      m.reply('*Could not fetch a fact right now. Try again!*');
    }
  }
});
