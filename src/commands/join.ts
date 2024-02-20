import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { APIApplicationCommandOptionChoice, EmbedBuilder } from "discord.js";
import fs from "fs";
import { guildIds } from "../config.js";

const data: any = JSON.parse(
  fs.readFileSync("src/assets/donnees.json", "utf8")
);
const countryTags = data.map((country: { description: any; tag: any }) => ({
  name: country.tag,
  value: country.description,
}));

const tag: APIApplicationCommandOptionChoice<string>[] = countryTags;
console.log("🚀 ~ choiceObject:", tag);

@ApplyOptions<Command.Options>({
  description: "A basic slash command",
  options: countryTags,
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => {
        builder //
          .setName(this.name)
          .setDescription(this.description)
          .addSubcommand((subcommand) =>
            subcommand
              .setName("list")
              .setDescription("List all the campaigns ongoing")
          )
          .addSubcommand((subcommand) =>
            subcommand.setName("campaigns").setDescription("Join a campaign")
          );
      },
      { guildIds }
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Select your country to play")
          .setAuthor({ name: this.container.client.user!.username })
          .setThumbnail(
            this.container.client.user?.avatarURL({ dynamic: true })!
          )
          .setFooter({ text: this.container.client.user!.username })
          .setImage("https://skanderbeg.pm/images/thumbnails/a40f83.png")
          .setTimestamp(),
      ],
      fetchReply: true,
    });
  }
}
