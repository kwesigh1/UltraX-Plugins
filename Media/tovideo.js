const fetch = require('node-fetch');
const FormData = require('form-data');
const cheerio = require('cheerio');

async function webp2mp4(buffer) {
  const form = new FormData();
  form.append('new-image-url', '');
  form.append('new-image', buffer, 'image.webp');
  const res = await fetch('https://ezgif.com/webp-to-mp4', { method: 'POST', body: form });
  const html = await res.text();
  const $ = cheerio.load(html);
  const form2 = new FormData();
  const obj = {};
  $('form input[name]').each((_, el) => {
    obj[$(el).attr('name')] = $(el).val();
    form2.append($(el).attr('name'), $(el).val());
  });
  const res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, { method: 'POST', body: form2 });
  const html2 = await res2.text();
  const $2 = cheerio.load(html2);
  const src = $2('div#output > p.outfile > video > source').attr('src');
  if (!src) throw new Error('Conversion failed');
  return new URL(src, res2.url).toString();
}

module.exports = () => ({
  name: 'ToVideo',
  triggers: ['tovideo', 'tovid', 'tomp4'],
  description: 'Convert a WebP sticker to MP4 video via ezgif.com',
  category: 'Media',
  react: '🎬',
  owner: false,
  run: async ({ m, Cypher, prefix, command }) => {
    const quoted = m.quoted;
    if (!quoted) return m.reply(`*Reply to a sticker with ${prefix + command}*`);
    if (!/webp/.test(quoted.mimetype || '')) return m.reply('*Please reply to a webp sticker!*');
    try {
      const buffer = await quoted.download();
      const videoUrl = await webp2mp4(buffer);
      await Cypher.sendFile(m.chat, videoUrl, 'converted.mp4', '', m);
    } catch (e) {
      m.reply('*Failed to convert sticker to video. Please try again later.*');
    }
  }
});
