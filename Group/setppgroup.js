module.exports = () => ({
  name: 'SetPPGroup',
  triggers: ['setppgroup'],
  description: 'Set the group profile picture',
  category: 'Group',
  react: '🖼️',
  owner: false,
  run: async ({ m, Cypher, prefix, command, isCreator }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    const groupMeta = await Cypher.groupMetadata(m.chat).catch(() => null);
      const parts = groupMeta?.participants || [];

const botJid = Cypher.decodeJid(Cypher.user.id);
const botLid = Cypher.decodeJid(Cypher.user.lid);

const senderJid = Cypher.decodeJid(m.sender);

const isBotAdmin = parts.some(p => {
  const pid = Cypher.decodeJid(p.id);
  return (
    (pid === botJid || p.id === botLid) && p.admin
  );
});

const isSenderAdmin = parts.some(p => {
  const pid = Cypher.decodeJid(p.id);
  const phone = p.phoneNumber ? Cypher.decodeJid(p.phoneNumber) : null;

  return (
    (pid === senderJid || phone === senderJid) && p.admin
  );
});
    if (!isSenderAdmin && !isCreator) return m.reply('*You need to be an admin!*');
    const quoted = m.quoted;
    if (!quoted) return m.reply(`*Reply to an image with ${prefix + command}*`);
    const mime = quoted.mimetype || '';
    if (!/image/.test(mime) || /webp/.test(mime)) return m.reply('*Please reply to a JPEG/PNG image!*');
    try {
      const buffer = await quoted.download();
      await Cypher.updateProfilePicture(m.chat, buffer);
      m.reply('*Group profile picture updated!*');
    } catch (e) {
      m.reply('*Failed to update profile picture. Make sure the image is valid.*');
    }
  }
});
