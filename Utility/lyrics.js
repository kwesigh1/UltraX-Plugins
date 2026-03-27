const axios = require('axios');

module.exports = () => ({
  name: "Lyrics Finder",
  triggers: ["lyrics", "lyric", "lrc", "findlyrics"],
  description: "Search for song lyrics",
  category: "Utility",
  react: "🎶",

  run: async ({ m, text, prefix, command, Cypher }) => {
    if (!text) {
      return m.reply(`*Usage:* ${prefix + command} <song name>\n*Example:* ${prefix + command} Blinding Lights`);
    }

    try {
      const { data } = await axios.get(`https://lrclib.net/api/search`, {
        params: { q: text },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 10000
      });

      if (!data || data.length === 0) {
        return m.reply(`❌ No lyrics found for *"${text}"*. Try adding the artist name.`);
      }

      const track = data[0];
      let lyrics = track.plainLyrics;
      if (!lyrics && track.syncedLyrics) {
        lyrics = track.syncedLyrics.replace(/\[\d+:\d+\.\d+\]/g, '').trim();
      }

      if (track.instrumental || !lyrics) {
        return m.reply(`🎶 *${track.trackName}* - *${track.artistName}*\n\nThis track is marked as *Instrumental* (no lyrics).`);
      }

      let response = `🎶 *Lyrics Finder*\n\n`;
      response += `🔹 *Title:* ${track.trackName}\n`;
      response += `🔹 *Artist:* ${track.artistName}\n`;
      response += `🔹 *Album:* ${track.albumName || 'N/A'}\n\n`;
      response += `────────────────────\n\n`;
      response += lyrics;

      return m.reply(response.trim());
    } catch (error) {
      console.error('Lyrics API Error:', error.response?.data || error.message);
      return m.reply(`❌ *API Error:* ${error.response?.status || 'Connection Timeout'}\nFailed to fetch lyrics.`);
    }
  }
});
