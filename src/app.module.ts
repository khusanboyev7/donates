import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsModule } from './cards/cards.module';
import { RecipientSocialModule } from './recipient-social/recipient-social.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { RecipientModule } from './recipient/recipient.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { DonateModule } from './donate/donate.module';
import { PaymentModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
      synchronize: true,
    }),
    CardsModule,
    RecipientSocialModule,
    SocialMediaModule,
    RecipientModule,
    AdminModule,
    AuthModule,
    CategoryModule,
    ShopModule,
    OrderModule,
    UserModule,
    DonateModule,
    PaymentModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
