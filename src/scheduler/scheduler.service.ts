import { Injectable } from '@nestjs/common';
import { DiscordService } from '../discord/discord.service';
import { CopierService } from '../copier/copier.service';
import { StorageService } from '../storage/storage.service';

interface ScheduledTask {
  link: string;
  date: Date;
}

@Injectable()
export class SchedulerService {
  private tasks: ScheduledTask[] = [];

  constructor(
    private discord: DiscordService,
    private copier: CopierService,
    private storage: StorageService,
  ) {}

  async schedule(link: string, date: Date) {
    const task: ScheduledTask = { link, date };

    this.tasks.push(task);
    this.storage.save(this.tasks);

    setTimeout(async () => {
      const payload = await this.copier.fetchMessage(link);

      await this.discord.send(
        process.env.CHANGELOG_CHANNEL_ID as string,
        payload,
      );
    }, date.getTime() - Date.now());
  }

  list() {
    return this.tasks;
  }

  cancelAll() {
    this.tasks = [];
    this.storage.clear();
  }
}
