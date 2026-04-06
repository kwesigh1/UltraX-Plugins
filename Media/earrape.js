const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
module.exports = () => ({
  name: 'Earrape',
  triggers: ['earrape'],
  description: 'Extremely loud audio effect',
  category: 'Media',
  react: '🔊',
  owner: false,
  run: async ({ m, Cypher, prefix, command }) => {
    const quoted = m.quoted;
    if (!quoted || !/audio/.test(quoted.mimetype || '')) return m.reply(`*Reply to an audio file with ${prefix + command}*`);
    try {
      const buf = await quoted.download();
      const tmpIn = path.join(require('os').tmpdir(), `earrape_in_${Date.now()}.mp3`);
      const tmpOut = path.join(require('os').tmpdir(), `earrape_out_${Date.now()}.mp3`);
      fs.writeFileSync(tmpIn, buf);
      exec(`ffmpeg -i "${tmpIn}" -af volume=12 "${tmpOut}"`, (err) => {
        fs.unlinkSync(tmpIn);
        if (err) return m.reply('*Error processing audio!*');
        const out = fs.readFileSync(tmpOut);
        Cypher.sendMessage(m.chat, { audio: out, mimetype: 'audio/mpeg' }, { quoted: m });
        fs.unlinkSync(tmpOut);
      });
    } catch (e) { m.reply('*Failed to process audio.*'); }
  }
});
