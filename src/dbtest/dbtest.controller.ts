import { Body, Controller, Post } from '@nestjs/common';
import { DbtestService } from './dbtest.service';

@Controller('dbtest')
export class DbtestController {
  constructor(private readonly dbtestService: DbtestService) {}

  @Post()
  addTest(@Body() body: { word: string }) {
    return this.dbtestService.addTestWord(body.word);
  }
}
