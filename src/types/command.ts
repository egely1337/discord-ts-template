import { CommandInteraction, SlashCommandBuilder } from "discord.js"

export type CommandType = {
    execute: (interaction: CommandInteraction) => void,
    data: SlashCommandBuilder
}