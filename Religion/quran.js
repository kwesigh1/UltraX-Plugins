const fetch = require('node-fetch');
module.exports = () => ({
  name: 'Quran',
  triggers: ['quran'],
  description: 'Get a Quran surah by number or name',
  category: 'Religion',
  react: '🕋',
  owner: false,
  run: async ({ m, Cypher, args, prefix, command }) => {
    if (!args[0]) return m.reply(`*Please specify a surah number or name*\n*Example: ${prefix + command} Al-Fatiha*`);
    try {
      const listRes = await fetch('https://quran-endpoint.vercel.app/quran');
      const listData = await listRes.json();
      const input = args[0];
      const surah = listData.data.find(s =>
        s.number === Number(input) ||
        s.asma?.ar?.short?.toLowerCase() === input.toLowerCase() ||
        s.asma?.en?.short?.toLowerCase() === input.toLowerCase()
      );
      if (!surah) return m.reply(`*Surah "${input}" not found!*`);
      const res = await fetch(`https://quran-endpoint.vercel.app/quran/${surah.number}`);
      const json = await res.json();
      const d = json.data;
      const text = `*Quran: The Holy Book*\n\n*Surah ${d.number}: ${d.asma.ar.long} (${d.asma.en.long})*\nType: ${d.type.en}\nVerses: ${d.ayahCount}\n\n*Tafsir:*\n${d.tafsir.id}`;
      m.reply(text);
      if (d.recitation?.full) {
        await Cypher.sendMessage(m.chat, { audio: { url: d.recitation.full }, mimetype: 'audio/mp4', ptt: true, fileName: 'recitation.mp3' }, { quoted: m });
      }
    } catch (e) {
      m.reply(`*Error fetching surah: ${e.message}*`);
    }
  }
});
