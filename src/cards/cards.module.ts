import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { Recipient } from '../recipient/models/recipient.model';

@Module({
  imports: [SequelizeModule.forFeature([Card, Recipient])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
