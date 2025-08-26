const { 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    SelectMenuBuilder 
} = require('discord.js');

class EmbedModule {
    constructor() {
        this.embed = new EmbedBuilder();
    }

    title(title) {
        this.embed.setTitle(title);
        return this;
    }

    desc(description) {
        this.embed.setDescription(description);
        return this;
    }

    color(color) {
        this.embed.setColor(color);
        return this;
    }

    footer(text, iconURL) {
        this.embed.setFooter({ text, iconURL });
        return this;
    }

    author(name, iconURL, url) {
        this.embed.setAuthor({ name, iconURL, url });
        return this;
    }

    field(name, value, inline = false) {
        this.embed.addFields({ name, value, inline });
        return this;
    }

    fields(fieldsArray) {
        this.embed.addFields(...fieldsArray);
        return this;
    }

    thumbnail(url) {
        this.embed.setThumbnail(url);
        return this;
    }

    image(url) {
        this.embed.setImage(url);
        return this;
    }

    timestamp(date = new Date()) {
        this.embed.setTimestamp(date);
        return this;
    }

    build() {
        return this.embed;
    }
}

const EmbedWrapper = () => new EmbedModule();


class ComponentsModule {
    constructor() {
        this.rows = [];
        this.currentRow = new ActionRowBuilder();
    }

    row() {
        if (this.currentRow.components.length > 0) {
            this.rows.push(this.currentRow);
        }
        this.currentRow = new ActionRowBuilder();
        return this;
    }

    button(label, customId, style = 'Primary', disabled = false) {
        const styleMap = {
            Primary: ButtonStyle.Primary,
            Secondary: ButtonStyle.Secondary,
            Success: ButtonStyle.Success,
            Danger: ButtonStyle.Danger,
            Link: ButtonStyle.Link
        };

        const btn = new ButtonBuilder()
            .setLabel(label)
            .setCustomId(customId)
            .setStyle(styleMap[style] || ButtonStyle.Primary)
            .setDisabled(disabled);

        this.currentRow.addComponents(btn);
        return this;
    }

    select(customId, placeholder = 'Select an option', options = []) {
        const select = new SelectMenuBuilder()
            .setCustomId(customId)
            .setPlaceholder(placeholder)
            .addOptions(options);

        this.currentRow.addComponents(select);
        return this;
    }

    build() {
        if (this.currentRow.components.length > 0) {
            this.rows.push(this.currentRow);
        }
        return this.rows;
    }
}

const ComponentsWrapper = () => new ComponentsModule();


module.exports = {
    EmbedWrapper,
    ComponentsWrapper
};
