import { ApplyOptions } from "@sapphire/decorators";
import { PaginatedMessageEmbedFields } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { APIApplicationCommandOptionChoice, EmbedBuilder } from "discord.js";
import fs from "fs";
import { guildIds } from "../config.js";

const data: any = JSON.parse(
  fs.readFileSync("src/assets/donnees.json", "utf8")
);
const countryTags: APIApplicationCommandOptionChoice<string>[] = data.map(
  (country: { description: any; tag: any }) => ({
    name: country.tag,
    value: country.description,
  })
);

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
          .addSubcommand((sub) =>
            sub
              .setName("continents")
              .setDescription(
                "Select the continent of the country you want to play"
              )
              .addStringOption((option) =>
                option
                  .setName("continent")
                  .setDescription(
                    "Select the continent of the country you want to play"
                  )
                  .setRequired(true)
                  .addChoices(
                    { name: "North America", value: "North America" },
                    {
                      name: "South America",
                      value: "South America",
                    },
                    {
                      name: "Europe",
                      value: "Europe",
                    },
                    {
                      name: "Asia",
                      value: "Asia",
                    },
                    {
                      name: "Russia",
                      value: "Russia",
                    },
                    {
                      name: "Oceania",
                      value: "Oceania",
                    }
                  )
              )
          );
      },
      { guildIds }
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    if (interaction.options.getSubcommand() === "continents") {
      new PaginatedMessageEmbedFields()
        .setTemplate(
          new EmbedBuilder()
            .setColor("#006080")
            .setTitle("List of all country by selected continent")
            .setDescription(
              `Selected Continent : ${interaction.options.getString("continent")}`
            )
        )
        .setItems(
          countryTags.map((countryTag) => ({
            name: countryTag.name,
            value: countryTag.name,
            inline: false,
          }))
        )
        .setItemsPerPage(25)
        .setActions()
        .make()
        .run(interaction);
    }
    // return interaction.reply({
    //   content: `Commande Incorrect`,
    // });
  }
}
