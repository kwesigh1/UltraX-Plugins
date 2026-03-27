# 🧩 UltraX Plugin Development Guide

Welcome to the UltraX community! This repository serves as a centralized hub for external plugins compatible with the **UltraX Bot**. Contributions are welcome!

## 📂 Folder Structure
For neatness, please categorize your plugins into folders:
- `Utility/` - Converters, calculators, search tools.
- `Fun/` - Jokes, memes, random facts.
- `Games/` - Interactive games.
- `Media/` - Image/Video downloaders and editors.
- `Group/` - Administration and management tools.

## 🛠️ Plugin Template
Every plugin must export a function that returns an object. Copy this boilerplate to get started:

```javascript
module.exports = () => ({
  name: "Plugin Display Name",
  triggers: ["cmd", "alias"], // First trigger is the primary command
  description: "Briefly explain what this command does",
  category: "Utility",        // Used for menu categorization
  react: "🚀",                // Optional: Emoji to react with on trigger
  owner: false,               // Optional: Set true for Bot Owner only
  restricted: false,          // Optional: Set true for Bot Creator only

  run: async ({ m, Cypher, args, text, prefix, sessionId, db }) => {
    try {
      // Your logic here
      await m.reply("Hello from the plugin!");
    } catch (error) {
      console.error(error);
      await m.reply("❌ An error occurred.");
    }
  }
});
```

## 🧠 Understanding the Arguments
The `run` function provides a rich context to interact with the bot and the user:

| Argument | Type | Description |
| :--- | :--- | :--- |
| `m` | `Object` | The decorated message object. Use `m.reply('text')` for quick responses. |
| `Cypher` | `Object` | The Baileys socket instance. Use this for complex tasks like `Cypher.sendMessage()`. |
| `args` | `Array` | An array of words sent after the command. |
| `text` | `String` | The raw string of text sent after the command. |
| `prefix` | `String` | The current prefix being used by the user. |
| `sessionId` | `String` | The phone number/ID of the current bot session. |
| `db` | `Object` | The session-specific database (settings like `botname`, `mode`, etc). |

## 📏 Development Standards

### 1. Error Handling
Always wrap your code in `try...catch` blocks to prevent the bot session from crashing. Use `m.reply` to inform the user if something goes wrong.

### 2. External Dependencies
If your plugin requires a new `npm` package, please mention it in your Pull Request. However, try to use built-in dependencies already available in UltraX:
- `axios` / `node-fetch` (Networking)
- `fs` / `path` (File System)
- `moment-timezone` (Time handling)

### 3. Media Handling
To download quoted media, use the built-in helper:
```javascript
const quoted = m.quoted || m.msg?.quoted;
if (quoted) {
  const buffer = await quoted.download();
}
```

### 4. Code Quality
- Use descriptive variable names.
- Avoid hardcoding the prefix; always use the `prefix` variable provided in arguments.
- Ensure your code is compatible with the "Flattened" structure (UltraX saves all external plugins into one directory).

## 🤝 How to Contribute
1. **Fork** the repository.
2. **Create a new branch** for your plugin: `git checkout -b plugin/my-cool-tool`.
3. **Upload** your `.js` file to the appropriate category folder.
4. **Test** the plugin on your local UltraX instance using by uploading it in the Plugins directory.
5. **Submit a Pull Request** with a clear description of what the plugin does.

---
*Built with ❤️ for the UltraX Community.*
```
