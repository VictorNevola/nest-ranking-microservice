import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { RankingSchema } from "./interfaces/ranking.schema";
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ranking', schema: RankingSchema }]),
    ProxyRMQModule
  ],
  providers: [RankingsService],
  controllers: [RankingsController]
})
export class RankingsModule { }
