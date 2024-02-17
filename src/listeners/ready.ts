import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";

@ApplyOptions<Listener.Options>({})
export class ReadyListener extends Listener {
  public run(client: Client) {
    const { username, id } = client.user!;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
  }
}
