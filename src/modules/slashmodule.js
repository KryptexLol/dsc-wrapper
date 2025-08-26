const {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
  SlashCommandStringOption,
  SlashCommandIntegerOption,
  SlashCommandBooleanOption
} = require('discord.js');

class SlashModule {
    constructor() {
        this.builder = new SlashCommandBuilder();
        this.currentSub = null;
        this.currentGroup = null;
    }

    name(commandName) {
        this.builder.setName(commandName);
        return this;
    }

    desc(description) {
        this.builder.setDescription(description);
        return this;
    }

    addOption(type, name, description) {
        let option;
        switch(type) {
            case 'String':
                option = new SlashCommandStringOption().setName(name).setDescription(description);
                break;
            case 'Integer':
                option = new SlashCommandIntegerOption().setName(name).setDescription(description);
                break;
            case 'Boolean':
                option = new SlashCommandBooleanOption().setName(name).setDescription(description);
                break;
        }

        if (this.currentSub) {
            this.currentSub.addOptions(option);
        } else if (this.currentGroup) {
            this.currentGroup.addSubcommand(sub => sub.addOptions(option));
        } else {
            this.builder.addOptions(option);
        }
        return this;
    }

    options = {
        String: (name, desc) => this.addOption('String', name, desc),
        Integer: (name, desc) => this.addOption('Integer', name, desc),
        Boolean: (name, desc) => this.addOption('Boolean', name, desc)
    };

    sub = {
        name: (name) => {
            const sub = new SlashCommandSubcommandBuilder().setName(name);
            this.currentSub = sub;
            if (this.currentGroup) {
                this.currentGroup.addSubcommand(() => sub);
            } else {
                this.builder.addSubcommand(() => sub);
            }
            return this;
        },
        desc: (description) => {
            if (!this.currentSub) throw new Error('Define subcommand name first!');
            this.currentSub.setDescription(description);
            return this;
        },
        options: {
            String: (name, desc) => this.addOption('String', name, desc),
            Integer: (name, desc) => this.addOption('Integer', name, desc),
            Boolean: (name, desc) => this.addOption('Boolean', name, desc)
        }
    };

    group = {
        name: (name) => {
            const group = new SlashCommandSubcommandGroupBuilder().setName(name);
            this.currentGroup = group;
            this.builder.addSubcommandGroup(() => group);
            return this;
        },
        desc: (desc) => {
            if (!this.currentGroup) throw new Error('Define group name first!');
            this.currentGroup.setDescription(desc);
            return this;
        },
        sub: {
            name: (name) => {
                if (!this.currentGroup) throw new Error('Define group first!');
                const sub = new SlashCommandSubcommandBuilder().setName(name);
                this.currentSub = sub;
                this.currentGroup.addSubcommand(() => sub);
                return this;
            },
            desc: (desc) => {
                if (!this.currentSub) throw new Error('Define subcommand first!');
                this.currentSub.setDescription(desc);
                return this;
            },
            options: {
                String: (name, desc) => this.addOption('String', name, desc),
                Integer: (name, desc) => this.addOption('Integer', name, desc),
                Boolean: (name, desc) => this.addOption('Boolean', name, desc)
            }
        }
    };

    build() {
        return this.builder;
    }
}

const SlashCommand = () => new SlashModule();

module.exports = { SlashCommand };
