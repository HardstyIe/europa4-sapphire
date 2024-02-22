import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import {
  APIApplicationCommandOptionChoice,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
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

const index = 0;
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

  first = new ButtonBuilder()
    .setCustomId("first")
    .setLabel("First")
    .setStyle(ButtonStyle.Primary);
  previous = new ButtonBuilder()
    .setCustomId("previous")
    .setLabel("Previous")
    .setStyle(ButtonStyle.Primary);
  next = new ButtonBuilder()
    .setCustomId("next")
    .setLabel("Next")
    .setStyle(ButtonStyle.Primary);
  last = new ButtonBuilder()
    .setCustomId("last")
    .setLabel("Last")
    .setStyle(ButtonStyle.Primary);

  button = new ActionRowBuilder([
    this.first,
    this.previous,
    this.next,
    this.last,
  ]);

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    if (interaction.options.getSubcommand() === "list") {
      return interaction.reply({
        content: "List all the campaigns ongoing",
      });
    } else if (interaction.options.getSubcommand() === "campaigns") {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.username,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setTitle("List of all the country")
            .setFields(tag.splice(0, 25))
            .setFooter({
              text: `Pages ${index}/ ${Math.ceil(tag.length / 25)}`,
            }),
        ],
        components: [this.button],
      });
    }
    return interaction.reply({
      content: `Hello ${interaction.user.displayName}`,
    });
  }
}
