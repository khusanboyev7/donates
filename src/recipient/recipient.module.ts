import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';
import { Card } from '../cards/models/card.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Recipient, Card]), AuthModule],
  controllers: [RecipientController],
  providers: [RecipientService],
})
export class RecipientModule {}
