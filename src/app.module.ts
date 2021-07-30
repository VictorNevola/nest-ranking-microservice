import { Module } from '@nestjs/common';
import { RankingsModule } from './rankings/rankings.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/srranking',{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    ProxyRMQModule,
    RankingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
