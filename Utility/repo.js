const fetch = require('node-fetch');
module.exports = () => ({
  name: 'Repo',
  triggers: ['repo', 'sc', 'repository', 'script'],
  description: 'Show the UltraX bot repository info',
  category: 'Utility',
  react: '🔗',
  owner: false,
  run: async ({ m, Cypher }) => {
    try {
      const res = await fetch('https://api.github.com/repos/Dark-Xploit/CypherX-Ultra');
      const data = await res.json();
      const text = `*BOT REPOSITORY*\n\n` +
        `*Name:* ${data.name || 'CypherX-Ultra'}\n` +
        `*Stars:* ${data.stargazers_count || 0}\n` +
        `*Forks:* ${data.forks_count || 0}\n` +
        `*GitHub:*\nhttps://github.com/Dark-Xploit/CypherX-Ultra\n\n` +
        `@${m.sender.split('@')[0]}, don't forget to star and fork!`;
      Cypher.sendMessage(m.chat, { text, mentions: [m.sender] }, { quoted: m });
    } catch {
      m.reply(`*UltraX Repository:*\nhttps://github.com/Dark-Xploit/CypherX-Ultra\n\nPlugins:\nhttps://github.com/Dark-Xploit/UltraX-Plugins`);
    }
  }
});
