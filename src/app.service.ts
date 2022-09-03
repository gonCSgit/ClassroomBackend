import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMain() {
    return {
      name: 'classroom-api',
      version: '0.0.1',
      description: 'A REST API with NESTJS and MONGODB',
      author: 'gonCSgit',
    };
  }
}
