import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './model/shop.model';
import { Recipient } from '../recipient/models/recipient.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Shop, Recipient, User])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
