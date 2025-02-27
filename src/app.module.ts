import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DentalGraphModule } from './dental-graph/dental-graph.module';

const isDevEnvironment = process.env.NODE_ENV && process.env.NODE_ENV.includes('development')

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: (isDevEnvironment) ? '.env.development' : '.env.production'
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    DentalGraphModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
