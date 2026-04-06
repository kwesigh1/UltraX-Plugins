module.exports = () => ({
  name: 'GroupLink',
  triggers: ['grouplink', 'invitelink', 'gclink'],
  description: 'Get the group invite link',
  category: 'Group',
  react: '🔗',
  owner: false,
  run: async ({ m, Cypher, isCreator }) => {
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
    if (!isBotAdmin) return m.reply('*I need to be an admin to fetch the link!*');
    if (!isSenderAdmin && !isCreator) return m.reply('*You need to be an admin to get the group link!*');
    const code = await Cypher.groupInviteCode(m.chat).catch(() => null);
    if (!code) return m.reply('*Failed to get invite link.*');
    m.reply(`*Group Invite Link:*\nhttps://chat.whatsapp.com/${code}`);
  }
});
