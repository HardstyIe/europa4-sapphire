import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
config();

// const prisma = new PrismaClient();
const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.login(process.env.TOKEN);
