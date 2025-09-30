import { Injectable } from '@nestjs/common';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';

@Injectable()
export class RecipientSocialService {
  create(createRecipientSocialDto: CreateRecipientSocialDto) {
    return 'This action adds a new recipientSocial';
  }

  findAll() {
    return `This action returns all recipientSocial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipientSocial`;
  }

  update(id: number, updateRecipientSocialDto: UpdateRecipientSocialDto) {
    return `This action updates a #${id} recipientSocial`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipientSocial`;
  }
}
