const { WebhookClient, TextChannel } = require('discord.js'); const { EmbedModule, ComponentsModule } = require('./uiwrapper');

class WebhookWrapper { constructor(client) { this.client = client; this.webhooks = new Map(); }

static normalizePayload(payload) {
    const newPayload = { ...payload };

    if (newPayload.embeds) {
        newPayload.embeds = newPayload.embeds.map(embed => {
            return embed instanceof EmbedModule ? embed.build() : embed;
        });
    }

    if (newPayload.components) {
        newPayload.components = newPayload.components.map(comp => {
            return comp instanceof ComponentsModule ? comp.build() : comp;
        });
    }

    return newPayload;
}

async send(webhookNameOrURL, payload) {
    let webhook;

    if (this.webhooks.has(webhookNameOrURL)) {
        webhook = this.webhooks.get(webhookNameOrURL);
    } else {
        webhook = new WebhookClient({ url: webhookNameOrURL });
    }

    const normalized = WebhookWrapper.normalizePayload(payload);
    return await webhook.send(normalized);
}

async del(webhookNameOrURL) {
    let webhook;

    if (this.webhooks.has(webhookNameOrURL)) {
        webhook = this.webhooks.get(webhookNameOrURL);
        await webhook.delete('Deleted via wrapper');
        this.webhooks.delete(webhookNameOrURL);
        return true;
    } else {
        webhook = new WebhookClient({ url: webhookNameOrURL });
        await webhook.delete('Deleted via wrapper');
        return true;
    }
}

async create(channel, webhookName, avatar) {
    let targetChannel;
    if (typeof channel === 'string') {
        targetChannel = await this.client.channels.fetch(channel);
    } else {
        targetChannel = channel;
    }

    if (!(targetChannel instanceof TextChannel)) {
        throw new Error('Target must be a TextChannel or valid channel ID');
    }

    const webhook = await targetChannel.createWebhook({
        name: webhookName,
        avatar: avatar || undefined
    });

    this.webhooks.set(webhookName, new WebhookClient({ id: webhook.id, token: webhook.token }));
    return webhook;
}

async list(channel) {
    let targetChannel;
    if (typeof channel === 'string') {
        targetChannel = await this.client.channels.fetch(channel);
    } else {
        targetChannel = channel;
    }

    if (!(targetChannel instanceof TextChannel)) {
        throw new Error('Target must be a TextChannel or valid channel ID');
    }

    const webhooks = await targetChannel.fetchWebhooks();
    return webhooks.map(w => ({ id: w.id, name: w.name, url: w.url }));
}

}

const wb = (client) => new WebhookWrapper(client);

module.exports = { wb };


