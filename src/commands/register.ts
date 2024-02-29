import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { type CommandType } from "../types/command";

import { DbClient } from "../prisma/db";

export const RegisterCommand: CommandType = {
    async execute(interaction) {
        const isRegistered = await DbClient.user.CheckUserExists(interaction.user.id);

        if(isRegistered) {
            await interaction.reply({
                content: "**Zaten kayıt olmuşsun.**"
            })

            return;
        } else {
            const confirm = new ButtonBuilder().setLabel("Kayıt Ol").setStyle(ButtonStyle.Success).setCustomId("yes")
            const cancel = new ButtonBuilder().setLabel("Kayıt Olma").setStyle(ButtonStyle.Danger).setCustomId("no")
            const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(cancel, confirm);

            const embed = new EmbedBuilder()
            .setTitle("**Kayıt ol**")
            .setDescription("sisteme kayıt olmak istiyor musun?")
            .setFooter({
                text: `${interaction.user.username} tarafından istendi.`,
                iconURL: `${interaction.user.avatarURL()}`
            })
            .setColor('Random')

            const response = await interaction.reply({
                components: [row],
                embeds: [embed]
            });

            //@ts-ignore
            const filter = i => i.user.id === interaction.user.id;

            try {
                const confirmation = await response.awaitMessageComponent({
                    filter: filter,
                    time: 60_000
                })

                if(confirmation.customId === 'yes') {
                    await DbClient.user.CreateUser(confirmation.user.id);
                    
                    await confirmation.update({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Random')
                            .setTitle('**Başarıyla kayıt oldun.**')
                            .setFooter({
                                text: `${confirmation.user.displayName} kayıt oldu`,
                                iconURL: `${confirmation.user.avatarURL()}`
                            })
                        ]
                    })

                    setTimeout(async () => {
                        await confirmation.deleteReply();
                    }, 3000)
                } 

                if(confirmation.customId === 'no') {
                    await confirmation.update({
                        embeds: [
                            new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('**Vazgeçtin.**')
                            .setFooter({
                                text: `${confirmation.user.displayName} hesap açmayı reddetti.`,
                                iconURL: `${confirmation.user.avatarURL()}`
                            })
                        ]
                    })

                    setTimeout(async () => {
                        await confirmation.deleteReply();
                    }, 3000)
                }
            } catch(err) {
                console.error(err);
            }
        }
    },

    data: new SlashCommandBuilder()
	.setName('register')
	.setDescription('You will be registered.')
}

export default RegisterCommand;