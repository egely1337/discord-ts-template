import { SlashCommandBuilder } from "discord.js";
import { type CommandType } from "../types/command";

import { DbClient } from "../prisma/db";

export const BalanceCommand: CommandType = {
    async execute(interaction) {
        const user = await DbClient.user.GetUser(interaction.user.id);

        return await interaction.reply({
            content: `Merhaba, ${interaction.user.displayName}, cüzdanın bu kadar dolu $${user?.balance}`
        })
    },

    data: new SlashCommandBuilder()
	.setName('balance')
	.setDescription('See your balance')
}

export default BalanceCommand;