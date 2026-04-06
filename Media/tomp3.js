module.exports = () => ({
  name: 'ToMP3',
  triggers: ['tomp3'],
  description: 'Convert a voice note to an MP3 audio file',
  category: 'Media',
  react: '🎵',
  owner: false,
  run: async ({ m, Cypher }) => {
    const quoted = m.quoted;
    if (!quoted) return m.reply('*Reply to a voice note to convert it to MP3!*');
    if (!/audio/.test(quoted.mimetype || '')) return m.reply('*Only voice messages/audio can be converted!*');
    try {
      const buffer = await quoted.download();
      await Cypher.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
      m.reply('*Failed to convert audio.*');
    }
  }
});
