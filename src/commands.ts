import { CommandInteraction } from "discord.js";
import { type CommandType } from "./types/command";

// * commands
import HelloCommand from "./commands/hello"

// * end

type RunCommandProps = {
    commandName: string,
    interaction: CommandInteraction
}

export const Commands: CommandType[] = [
    HelloCommand
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