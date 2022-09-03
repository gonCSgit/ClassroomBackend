import { HttpStatus, Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMain(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getMain());
  }
}
