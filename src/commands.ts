import { CommandInteraction } from "discord.js";
import { type CommandType } from "./types/command";

// * commands
import BalanceCommand from "./commands/balance";
import RegisterCommand from "./commands/register";

// * end

type RunCommandProps = {
    commandName: string,
    interaction: CommandInteraction
}

export const Commands: CommandType[] = [
    BalanceCommand, RegisterCommand
];

export const CommandsData = Object.values(Commands).map((val) => val.data.toJSON());

export async function runCommand(
    {commandName, interaction}: RunCommandProps
) {
    Commands.forEach((val) => {
        if(val.data.name == commandName) {
            val.execute(interaction);
        }
    })
}