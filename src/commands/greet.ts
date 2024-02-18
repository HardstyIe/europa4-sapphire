import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework";
import { guildIds } from "../config.js";
console.log("🚀 ~ guildIds:", guildIds);

@ApplyOptions<Command.Options>({
  description: "A basic slash command",
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) => {
        builder //
          .setName(this.name)
          .setDescription(this.description);
      },
      { guildIds }
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    return interaction.reply({
      content: `Hello ${interaction.user.displayName}`,
    });
  }
}
