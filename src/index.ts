import { Client, CommandInteraction, Events, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';

import { deployCommands } from "./deployCommands";
import { runCommand } from "./commands";

async function main() {
    // * load .env
    dotenv.config();

    // * create client
    const client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages]
    })

    // * client ready event
    client.once(Events.ClientReady, async (client) => {
        console.log(`${client.user.displayName} is logged in.`);

        // * deploy commands
        await deployCommands({
            clientId: client.user.id // * user bot id
        });
    })

    // * client interaction create event
    client.on('interactionCreate', async (interaction) => {
        if(!interaction.isCommand()) return;

        // * check interaction is CommandInteraction
        if(interaction instanceof CommandInteraction) {
            // * run command
            await runCommand({
                commandName: interaction.commandName,
                interaction: interaction
            });
        } 
    })

    // * client message event
    client.on('messageCreate', async (message) => {
        // * do nothing
    })

    // * client login
    client.login(process.env.CLIENT_TOKEN);
}

main();