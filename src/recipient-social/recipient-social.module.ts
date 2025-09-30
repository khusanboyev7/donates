import { Module } from '@nestjs/common';
import { RecipientSocialService } from './recipient-social.service';
import { RecipientSocialController } from './recipient-social.controller';

@Module({
  controllers: [RecipientSocialController],
  providers: [RecipientSocialService],
})
export class RecipientSocialModule {}
