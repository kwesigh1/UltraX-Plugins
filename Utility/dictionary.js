const fetch = require('node-fetch');
module.exports = () => ({
  name: 'Dictionary',
  triggers: ['define', 'dict', 'dictionary'],
  description: 'Look up the definition of a word',
  category: 'Utility',
  react: '📖',
  owner: false,
  run: async ({ m, args, prefix, command }) => {
    if (!args[0]) return m.reply(`*Example: ${prefix + command} serendipity*`);
    const word = args[0];
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      if (!Array.isArray(data)) return m.reply(`*"${word}" not found in dictionary.*`);
      const entry = data[0];
      const meanings = entry.meanings.slice(0, 2).map(m2 => {
        const def = m2.definitions[0]?.definition || '';
        const example = m2.definitions[0]?.example ? `\n  _"${m2.definitions[0].example}"_` : '';
        return `*${m2.partOfSpeech}:* ${def}${example}`;
      }).join('\n\n');
      m.reply(`*${entry.word}*\nPhonetic: ${entry.phonetic || 'N/A'}\n\n${meanings}`);
    } catch {
      m.reply('*Could not fetch definition. Try again!*');
    }
  }
});
