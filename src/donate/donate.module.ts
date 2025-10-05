import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DonateService } from './donate.service';
import { DonateController } from './donate.controller';
import { Donate } from './models/donate.model';
import { User } from '../user/models/user.model';
import { Recipient } from '../recipient/models/recipient.model';
import { Payment } from '../payments/models/payment.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Donate, User, Recipient, Payment])],
  controllers: [DonateController],
  providers: [DonateService],
  exports: [DonateService],
})
export class DonateModule {}
