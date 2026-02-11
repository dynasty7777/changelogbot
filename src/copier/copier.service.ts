import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

interface DiscordAttachment {
  url: string;
}

interface DiscordMessage {
  content: string;
  embeds: any[];
  attachments?: DiscordAttachment[];
}

@Injectable()
export class CopierService {
  async fetchMessage(link: string) {
    const parts = link.split('/');
    const channelId = parts[5];
    const messageId = parts[6];

    const res = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      },
    );

    const msg = (await res.json()) as DiscordMessage;

    return {
      content: msg.content,
      embeds: msg.embeds,
      files: msg.attachments?.map((a: DiscordAttachment) => a.url),
    };
  }
}
