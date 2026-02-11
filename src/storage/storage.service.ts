import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const FILE = 'scheduled.json';

@Injectable()
export class StorageService {
  load(): any[] {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  }

  save(data: any[]) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  }

  clear() {
    this.save([]);
  }
}
