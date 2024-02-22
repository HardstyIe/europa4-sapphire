import { send } from "@sapphire/plugin-editable-commands";
import { EmbedBuilder, Message } from "discord.js";

export const RandomLoadingMessage = [
  "Computing...",
  "Thinking...",
  "Cooking some food",
  "Give me a moment",
  "Loading...",
];
export function pickRandom<T>(array: readonly T[]): T {
  const { length } = array;
  return array[Math.floor(Math.random() * length)];
}
export function sendLoadingMessage(message: Message): Promise<typeof message> {
  return send(message, {
    embeds: [
      new EmbedBuilder()
        .setDescription(pickRandom(RandomLoadingMessage))
        .setColor("#FF0000"),
    ],
  });
}
