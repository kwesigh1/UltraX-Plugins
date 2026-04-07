const util = require('util');

module.exports = () => ({
  name: "Debug Eval",
  triggers: ["eval2"],
  description: "Evaluate and debug expressions",
  category: "Developer",
  owner: true,
  react: "🐛",

  run: async ({ m, Cypher, args, text }) => {
    if (!text) {
      return m.reply(
        `🐛 *Debug Eval Command*\n\n` +
        `Usage:\n` +
        `.eval m.chat - Get chat ID\n` +
        `.eval m.sender - Get sender JID\n` +
        `.eval m.key - Get message key\n` +
        `.eval Cypher.user - Get bot user info\n` +
        `.eval m.mentionedJid - Get mentioned JIDs\n` +
        `.eval m - Dump entire message object\n\n` +
        `Examples:\n` +
        `.eval m.chat\n` +
        `.eval m.sender\n` +
        `.eval Cypher.user.id`
      );
    }

    try {
      let result;
      
      // Evaluate the expression safely
      const expression = text.trim();
      
      // Create evaluation context
      const context = {
        m,
        Cypher,
        args
      };
      
      // Use Function constructor for safe evaluation
      const evaluator = new Function(...Object.keys(context), `return ${expression}`);
      result = evaluator(...Object.values(context));
      
      // Format result
      let output = util.inspect(result, {
        depth: 3,
        colors: false,
        compact: false
      });

      return m.reply(
        `🐛 *Debug Result*\n\n` +
        `*Expression:* \`${expression}\`\n\n` +
        `*Result:*\n\`\`\`\n${output}\n\`\`\``
      );
    } catch (error) {
      return m.reply(
        `❌ *Error*\n\n` +
        `*Expression:* \`${text}\`\n\n` +
        `*Error:*\n\`\`\`\n${error.message}\n\`\`\``
      );
    }
  }
});
