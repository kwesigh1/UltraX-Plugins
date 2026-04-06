const fs = require('fs');
module.exports = () => ({
  name: 'VCF',
  triggers: ['vcf'],
  description: 'Export all group members as a VCF contact file',
  category: 'Group',
  react: '📇',
  owner: true,
  run: async ({ m, Cypher, isCreator }) => {
    if (!m.isGroup) return m.reply('*This command is for groups only!*');
    if (!isCreator) return m.reply('*Only the bot owner can use this command!*');
    const g = await Cypher.groupMetadata(m.chat).catch(() => null);
    if (!g) return m.reply('*Could not fetch group info.*');
    m.reply(`*Saving ${g.participants.length} contacts, please wait...*`);
    let vcard = '';
    for (const p of g.participants) {
      const num = p.phoneNumber.split('@')[0];
      vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:UltraX🔥+${num}\nTEL;type=CELL;waid=${num}:+${num}\nEND:VCARD\n`;
    }
    const file = `./contacts_${Date.now()}.vcf`;
    fs.writeFileSync(file, vcard.trim());
    await Cypher.sendMessage(m.chat, {
      document: fs.readFileSync(file),
      mimetype: 'text/vcard',
      fileName: `${g.subject}-contacts.vcf`,
      caption: `*Group:* ${g.subject}\n*Contacts:* ${g.participants.length}`
    }, { quoted: m });
    fs.unlinkSync(file);
  }
});
