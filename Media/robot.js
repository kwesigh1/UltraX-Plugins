const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
module.exports = () => ({
  name: 'Robot',
  triggers: ['robot'],
  description: 'Add a robotic voice effect to audio',
  category: 'Media',
  react: '🤖',
  owner: false,
  run: async ({ m, Cypher, prefix, command }) => {
    const quoted = m.quoted;
    if (!quoted || !/audio/.test(quoted.mimetype || '')) return m.reply(`*Reply to an audio file with ${prefix + command}*`);
    try {
      const buf = await quoted.download();
      const tmpIn = path.join(require('os').tmpdir(), `robot_in_${Date.now()}.mp3`);
      const tmpOut = path.join(require('os').tmpdir(), `robot_out_${Date.now()}.mp3`);
      fs.writeFileSync(tmpIn, buf);
      exec(`ffmpeg -i "${tmpIn}" -filter_complex "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75" "${tmpOut}"`, (err) => {
        fs.unlinkSync(tmpIn);
        if (err) return m.reply('*Error processing audio!*');
        const out = fs.readFileSync(tmpOut);
        Cypher.sendMessage(m.chat, { audio: out, mimetype: 'audio/mpeg' }, { quoted: m });
        fs.unlinkSync(tmpOut);
      });
    } catch (e) { m.reply('*Failed to process audio.*'); }
  }
});
