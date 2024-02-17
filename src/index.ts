import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
config();
export const guildIds = [process.env.GUILD_ID!];

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login(process.env.TOKEN);
