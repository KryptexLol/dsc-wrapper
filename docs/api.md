# dsc-wrapper API Documentation

A full reference for all classes, methods, and usage in the `dsc-wrapper` package.


——————————————————————————————————————————————————————————————————————

# SlashCommand

Fluent wrapper to create Discord.js **slash commands**.

### SlashCommand()

Creates a new command object.

**Methods:**

| Method                              | Description                                |
| ----------------------------------- | ------------------------------------------ |
| `.name(commandName)`                | Set the slash command name (string)        |
| `.desc(description)`                | Set the command description (string)       |
| `.sub.name(subCommandName)`         | Set a subcommand name (string)             |
| `.sub.desc(subCommandDescription)`  | Set a subcommand description (string)      |
| `.options.String(optionName)`       | Add a string option                        |
| `.options.Integer(optionName)`      | Add an integer option                      |
| `.options.Boolean(optionName)`      | Add a boolean option                       |
| `.options.[type].name(name)`        | Set option name                            |
| `.options.[type].desc(description)` | Set option description                     |
| `.build()`                          | Finalize the command object for Discord.js |

**Example:**

```javascript
const command = SlashCommand()
    .name('userinfo')
    .desc('Get user info')
    .options.String('username')
        .name('username')
        .desc('The username to lookup')
    .options.Boolean('verbose')
        .name('verbose')
        .desc('Show detailed info')
    .build();
```

——————————————————————————————————————————————————————————————————————

# Embed Wrapper

Fluent wrapper for **Discord embeds**. Fully supports title, description, color, footer, author, fields, thumbnail, image, and timestamp.

### EmbedWrapper()

Creates a new embed object.

**Methods:**

| Method                          | Description                               | Parameters                                          |
| ------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| `.title(text)`                  | Set embed title                           | `text: string`                                      |
| `.desc(text)`                   | Set embed description                     | `text: string`                                      |
| `.color(color)`                 | Set embed color                           | `color: string or number`                           |
| `.footer(text, iconURL?)`       | Set footer                                | `text: string`, `iconURL?: string`                  |
| `.author(name, iconURL?, url?)` | Set author                                | `name: string`, `iconURL?: string`, `url?: string`  |
| `.field(name, value, inline?)`  | Add a single field                        | `name: string`, `value: string`, `inline?: boolean` |
| `.fields(array)`                | Add multiple fields                       | `array: {name, value, inline}[]`                    |
| `.thumbnail(url)`               | Set thumbnail image                       | `url: string`                                       |
| `.image(url)`                   | Set main image                            | `url: string`                                       |
| `.timestamp(date?)`             | Set timestamp                             | `date?: Date`                                       |
| `.build()`                      | Returns a `Discord.EmbedBuilder` instance |                                                     |

**Example:**

```javascript
const embed = EmbedWrapper()
    .title('Hello World')
    .desc('This is a full-feature embed')
    .color('#00FF00')
    .footer('Footer text', 'https://i.imgur.com/AfFp7pu.png')
    .author('Bot Name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
    .field('Members', '123', true)
    .field('Boosts', '5', true)
    .fields([
        { name: 'Rank', value: 'Gold', inline: true },
        { name: 'XP', value: '2000', inline: true }
    ])
    .thumbnail('https://i.imgur.com/AfFp7pu.png')
    .image('https://i.imgur.com/AfFp7pu.png')
    .timestamp()
    .build();
```

——————————————————————————————————————————————————————————————————————

# Components Wrapper

Fluent wrapper for **buttons, select menus, and action rows**.

### ComponentsWrapper()

Creates a new components object.

**Methods:**

| Method                                        | Description                             | Parameters                                                                                            |
| --------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `.button(label, customId, style?, disabled?)` | Add a button                            | `label: string`, `customId: string`, `style?: string`, `disabled?: boolean`                           |
| `.select(customId, placeholder?, options?)`   | Add a select menu                       | `customId: string`, `placeholder?: string`, `options?: {label, value, description, emoji, default}[]` |
| `.row()`                                      | Start a new action row                  | none                                                                                                  |
| `.build()`                                    | Returns an array of `ActionRowBuilder`s |                                                                                                       |

**Example:**

```javascript
const components = ComponentsWrapper()
    .button('Click Me', 'btn_1')
    .button('Cancel', 'btn_cancel', 'Danger')
    .row()
    .select('menu_1', 'Choose an option', [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' }
    ])
    .build();
```

——————————————————————————————————————————————————————————————————————

# Webhook Wrapper

Wrapper to **create, send, delete, and list webhooks**, with optional **custom name and avatar** per message. Supports **EmbedWrapper** and **ComponentsWrapper** directly.

### wb(client)

Initialize with a Discord.js client.

**Methods:**

| Method                                   | Description                                               | Parameters                                                                                           | Returns                           |
| ---------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------- |
| `.create(channel, webhookName, avatar?)` | Create a webhook                                         | `channel: TextChannel or ID`, `webhookName: string`, `avatar?: string`                                | `Promise<Webhook>`                |
| `.send(webhookNameOrURL, payload)`       | Send message via webhook with optional name/avatar override | `webhookNameOrURL: string`, `payload: {content?, embeds?, components?, username?, avatarURL?}`      | `Promise<Message>`                |
| `.del(webhookNameOrURL)`                 | Delete a webhook                                         | `webhookNameOrURL: string`                                                                          | `Promise<boolean>`                |
| `.list(channel)`                         | List all webhooks in a channel                            | `channel: TextChannel or ID`                                                                        | `Promise<Array<{id, name, url}>>` |

**Example:**

```javascript
const webhookClient = wb(client);

// Create webhook
await webhookClient.create('CHANNEL_ID', 'MyWebhook', 'https://i.imgur.com/AfFp7pu.png');

// Send embed + buttons with custom name and avatar
await webhookClient.send('MyWebhook', {
    username: 'Custom Name',
    avatarURL: 'https://i.imgur.com/AfFp7pu.png',
    content: 'Hello world!',
    embeds: [EmbedWrapper().title('Hello')],
    components: [ComponentsWrapper().button('Click Me', 'btn_click')]
});

// Send directly using webhook URL
await webhookClient.send('https://discord.com/api/webhooks/...', {
    content: 'Hello via URL'
});

// List webhooks
const webhooks = await webhookClient.list('CHANNEL_ID');

// Delete webhook by name
await webhookClient.del('MyWebhook');

// Delete webhook by URL
await webhookClient.del('https://discord.com/api/webhooks/...');
```


——————————————————————————————————————————————————————————————————————

# Quick Reference

| Wrapper           | Key Methods                                                                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SlashCommand      | `.name()`, `.desc()`, `.sub.name()`, `.sub.desc()`, `.options.String()`, `.options.Integer()`, `.options.Boolean()`, `.build()`                               |
| Embeds Wrapper      | `.title()`, `.desc()`, `.color()`, `.footer()`, `.author()`, `.field()`, `.fields()`, `.thumbnail()`, `.image()`, `.timestamp()`, `.build()`                  |
| Components Wrapper | `.button()`, `.select()`, `.row()`, `.build()`                                                                                                                |
| Webhook Wrapper                | `.create()`, `.send({content?, embeds?, components?, username?, avatarURL?})`, `.list()`, `.del()`                                                          |
