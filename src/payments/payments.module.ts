import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentService } from './payments.service';
import { PaymentController } from './payments.controller';
import { Payment } from './models/payment.model';
import { User } from '../user/models/user.model';
import { Donate } from '../donate/models/donate.model';
import { Order } from '../order/model/order.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Payment, User, Donate, Order])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
