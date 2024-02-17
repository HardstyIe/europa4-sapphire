import { ApplicationCommandRegistry, Command } from "@sapphire/framework";

export class SlashCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "greet",
      description: "Say hello to a user.",
      aliases: ["hello", "hi", "hey", "sup", "what's up", "what"],
    });
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addUserOption((option) =>
          option //
            .setName("user")
            .setDescription("User to say hello to")
            .setRequired(true)
        )
    );
  }

  public override chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const user = interaction.options.getUser("user");
    interaction.reply({
      content: `Hello ${user?.username ?? user?.id}!`,
      ephemeral: true,
      fetchReply: true,
    });
  }
}
