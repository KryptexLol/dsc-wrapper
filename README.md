dsc-wrapper

A lightweight Discord.js wrapper for slash commands, embeds, components, and webhooks.

 


## Installation

```bash
npm install dsc-wrapper
```

## Importing

```javascript
const { SlashCommand, EmbedWrapper, ComponentsWrapper, wb } = require('dsc-wrapper');
```
——————————————————————————————————————————————————————————————————————

## SlashCommands

# Basic Command

```javascript
const command = SlashCommand()
    .name('demo')
    .desc('Demo command')
    .build();
```

## Subcommands

```javascript
const command = SlashCommand()
    .name('demo')
    .desc('Demo command')
    .sub.name('embedbutton')
    .sub.desc('Send an embed with buttons')
    .sub.name('embedonly')
    .sub.desc('Send only an embed')
    .build();
```

## Options

```javascript
const command = SlashCommand()
    .name('userinfo')
    .desc('Get user info')
    .options.String('username')
        .name('username')
        .desc('The username to search')
    .options.Boolean('verbose')
        .name('verbose')
        .desc('Show detailed info')
    .build();
```

## Execute Example

```javascript
module.exports = {
    data: command,
    async execute(interaction) {
        const username = interaction.options.getString('username');
        const verbose = interaction.options.getBoolean('verbose');

        await interaction.reply(`User: ${username}, Verbose: ${verbose}`);
    }
};
```

——————————————————————————————————————————————————————————————————————

## EmbedBuilder

# Fluent API for creating Discord embeds

# Create an Embed

```javascript
const embed = EmbedWrapper()
    .title('Hello World')
    .desc('This is a description')
    .color('#00FF00')
    .footer('Footer text')
    .author('Bot Name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
    .field('Members', '123', true)
    .field('Boosts', '5', true)
    .thumbnail('https://i.imgur.com/AfFp7pu.png')
    .image('https://i.imgur.com/AfFp7pu.png')
    .timestamp()
    .build();
```

## Send Embed

```javascript
interaction.reply({ embeds: [embed] });
channel.send({ embeds: [embed] });
```

——————————————————————————————————————————————————————————————————————

## ComponentsBuilder

# Create buttons, select menus, and rows.

# Buttons & Select Menus

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

## Send Components

```javascript
interaction.reply({ components: components });
channel.send({ components: components });
```

——————————————————————————————————————————————————————————————————————

## Webhook Builder

# Send messages, create, delete, and list webhooks. Supports EmbedWrapper and ComponentsWrapper directly.

# Initialize

```javascript
const webhookClient = wb(client);
```

# Create Webhook

```javascript
await webhookClient.create('CHANNEL_ID', 'MyWebhook', 'https://i.imgur.com/AfFp7pu.png');
```

# Send Message via Webhook

```javascript
await webhookClient.send('MyWebhook', {
    embeds: [EmbedWrapper().title('Webhook Embed')],
    components: [ComponentsWrapper().button('Click Me', 'btn_click')]
});
```

# List Webhooks

```javascript
const webhooks = await webhookClient.list('CHANNEL_ID');
console.log(webhooks); // [{ id, name, url }, ...]
```

# Delete Webhook
```javascript
await webhookClient.del('MyWebhook');
```

——————————————————————————————————————————————————————————————————————

## Full Examples

# 1. Slash Command + Embed + Buttons

```javascript
interaction.reply({
    embeds: [EmbedWrapper().title('Hello').desc('Embed with buttons')],
    components: [ComponentsWrapper().button('Click', 'btn_1')]
});
```

## 2. Slash Command + Embed Only

```javascript
interaction.reply({
    embeds: [EmbedWrapper().title('Embed Only').desc('No buttons')]
});
```

## 3. Slash Command + Components Only

```javascript
interaction.reply({
    components: [ComponentsWrapper().button('Click', 'btn_1')]
});
```

## 4. Webhook Message Only

```javascript
await webhookClient.send('MyWebhook', { content: 'Plain message' });
```
