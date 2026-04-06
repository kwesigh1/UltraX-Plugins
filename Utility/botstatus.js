const os = require('os');
const { performance } = require('perf_hooks');

function formatSize(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}

function runtime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = () => ({
  name: 'BotStatus',
  triggers: ['botstatus', 'statusbot'],
  description: 'Display detailed bot and server status',
  category: 'Utility',
  react: '📊',
  owner: false,
  run: async ({ m, Cypher }) => {
    const start = performance.now();
    await m.reply('⏳ *Calculating...*');
    const latency = `${(performance.now() - start).toFixed(2)} ms`;
    const used = process.memoryUsage();
    const uptime = runtime(process.uptime());
    const sysUptime = runtime(os.uptime());
    const cpuModel = os.cpus()[0]?.model || 'Unknown';
    const cpuCores = os.cpus().length;
    const ramUsed = formatSize(used.heapUsed);
    const ramTotal = formatSize(os.totalmem());
    const freeRam = formatSize(os.freemem());
    const nodeVer = process.version;
    const pid = process.pid;
    const text = `*BOT STATUS*\n\n` +
      `*Performance*\n` +
      `▸ Ping: ${latency}\n` +
      `▸ Bot Uptime: ${uptime}\n` +
      `▸ System Uptime: ${sysUptime}\n\n` +
      `*Resources*\n` +
      `▸ RAM: ${ramUsed} / ${ramTotal}\n` +
      `▸ Free RAM: ${freeRam}\n` +
      `▸ Heap: ${formatSize(used.heapUsed)}\n` +
      `▸ RSS: ${formatSize(used.rss)}\n\n` +
      `*Processor*\n` +
      `▸ Model: ${cpuModel}\n` +
      `▸ Cores: ${cpuCores}\n\n` +
      `*Software*\n` +
      `▸ Node.js: ${nodeVer}\n` +
      `▸ PID: ${pid}`;
    Cypher.sendMessage(m.chat, { text }, { quoted: m });
  }
});
