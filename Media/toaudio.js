const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
module.exports = () => ({
  name: 'ToAudio',
  triggers: ['toaudio'],
  description: 'Extract audio from a video',
  category: 'Media',
  react: '🎵',
  owner: false,
  run: async ({ m, Cypher, prefix, command }) => {
    const quoted = m.quoted;
    if (!quoted) return m.reply('*Reply to a video to extract audio!*');
    if (!/video/.test(quoted.mimetype || '')) return m.reply('*Only videos can be converted to audio!*');
    try {
      const buf = await quoted.download();
      const tmpIn = path.join(require('os').tmpdir(), `ta_in_${Date.now()}.mp4`);
      const tmpOut = path.join(require('os').tmpdir(), `ta_out_${Date.now()}.mp3`);
      fs.writeFileSync(tmpIn, buf);
      exec(`ffmpeg -i "${tmpIn}" -vn -acodec mp3 "${tmpOut}"`, (err) => {
        fs.unlinkSync(tmpIn);
        if (err) return m.reply('*Failed to extract audio!*');
        const out = fs.readFileSync(tmpOut);
        Cypher.sendMessage(m.chat, { audio: out, mimetype: 'audio/mpeg' }, { quoted: m });
        fs.unlinkSync(tmpOut);
      });
    } catch (e) { m.reply('*Failed to convert video to audio.*'); }
  }
});
