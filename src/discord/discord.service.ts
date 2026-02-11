import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

@Injectable()
export class DiscordService implements OnModuleInit {
  public client!: Client;

  async onModuleInit() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    await this.client.login(process.env.BOT_TOKEN);
  }

  async send(channelId: string, payload: any) {
    const channel = (await this.client.channels.fetch(
      channelId,
    )) as TextChannel;

    await channel.send(payload);
  }
}
