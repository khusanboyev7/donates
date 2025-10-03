import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Order } from '../order/model/order.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Order])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
