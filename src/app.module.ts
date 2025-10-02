import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardsModule } from './cards/cards.module';
import { RecipientSocialModule } from './recipient-social/recipient-social.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { RecipientModule } from './recipient/recipient.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

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
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
