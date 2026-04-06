const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
module.exports = () => ({
  name: 'VolVideo',
  triggers: ['volvideo'],
  description: 'Adjust volume of a video. Usage: volvideo 5',
  category: 'Media',
  react: '🎬',
  owner: false,
  run: async ({ m, Cypher, args, prefix, command }) => {
    const quoted = m.quoted;
    if (!args[0]) return m.reply(`*Example: ${prefix + command} 10*`);
    if (!quoted || !/video/.test(quoted.mimetype || '')) return m.reply(`*Reply to a video with ${prefix + command}*`);
    const vol = parseFloat(args[0]);
    if (isNaN(vol) || vol <= 0) return m.reply('*Please provide a valid volume number (e.g. 5 or 0.5)*');
    try {
      const buf = await quoted.download();
      const tmpIn = path.join(require('os').tmpdir(), `vv_in_${Date.now()}.mp4`);
      const tmpOut = path.join(require('os').tmpdir(), `vv_out_${Date.now()}.mp4`);
      fs.writeFileSync(tmpIn, buf);
      exec(`ffmpeg -i "${tmpIn}" -filter:a volume=${vol} "${tmpOut}"`, (err) => {
        fs.unlinkSync(tmpIn);
        if (err) return m.reply('*Error processing video!*');
        const out = fs.readFileSync(tmpOut);
        Cypher.sendMessage(m.chat, { video: out, mimetype: 'video/mp4' }, { quoted: m });
        fs.unlinkSync(tmpOut);
      });
    } catch (e) { m.reply('*Failed to process video.*'); }
  }
});
