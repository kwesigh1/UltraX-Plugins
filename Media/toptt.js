module.exports = () => ({
  name: 'ToPTT',
  triggers: ['toptt', 'tovn'],
  description: 'Convert an audio file to a voice note (PTT)',
  category: 'Media',
  react: '🗣️',
  owner: false,
  run: async ({ m, Cypher }) => {
    const quoted = m.quoted;
    if (!quoted) return m.reply('*Reply to an audio file to convert to voice note!*');
    if (!/audio/.test(quoted.mimetype || '')) return m.reply('*Only audio files can be converted!*');
    try {
      const buffer = await quoted.download();
      await Cypher.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m });
    } catch (e) {
      m.reply('*Failed to convert to voice note.*');
    }
  }
});
