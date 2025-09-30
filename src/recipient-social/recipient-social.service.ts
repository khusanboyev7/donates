import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RecipientSocial } from './models/recipient-social.model';
import { SocialMedia } from '../social-media/models/social-media.model';
import { Recipient } from '../recipient/models/recipient.model';

@Injectable()
export class RecipientSocialService {
  constructor(
    @InjectModel(RecipientSocial)
    private readonly recipientSocialModel: typeof RecipientSocial,
    @InjectModel(SocialMedia)
    private readonly socialMediaModel: typeof SocialMedia,
    @InjectModel(Recipient) private readonly recipientModel: typeof Recipient,
  ) {}

  async create(
    CreateRecipientSocialDto: CreateRecipientSocialDto,
  ): Promise<RecipientSocial> {
    const { recipient_id, social_id } = CreateRecipientSocialDto;

    if (!recipient_id || !social_id) {
      throw new NotFoundException('Barchasini kiriting');
    }

    const recipientModel = await this.recipientModel.findByPk(recipient_id);
    if (!recipientModel) {
      throw new NotFoundException('Bunday recipient mavjud emas');
    }

    const socialMediaModel = await this.socialMediaModel.findByPk(social_id);
    if (!socialMediaModel) {
      throw new NotFoundException('bunday socialMedia mavjud emas');
    }

    return this.recipientSocialModel.create(CreateRecipientSocialDto);
  }

  findAll(): Promise<RecipientSocial[]> {
    return this.recipientSocialModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<RecipientSocial | null> {
    const recipientSocial = await this.recipientSocialModel.findByPk(id, {
      include: { all: true },
    });
    if (!recipientSocial) {
      throw new NotFoundException('RecipientSocial not found');
    }

    return recipientSocial;
  }

  async update(id: number, UpdateRecipientSocialDto: UpdateRecipientSocialDto) {
    const recipientSocial = await this.recipientSocialModel.findByPk(id);
    if (!recipientSocial) {
      throw new NotFoundException('RecipientSocial not found');
    }

    const recipient_social = await this.recipientSocialModel.update(
      UpdateRecipientSocialDto,
      { where: { id }, returning: true },
    );
    return recipient_social[1][0];
  }

  async remove(id: number) {
    const recipientSocial = await this.recipientSocialModel.destroy({
      where: { id },
    });
    if (!recipientSocial) {
      return { message: 'Bunday RecipientSocial mavjud emas' };
    }
    return { message: "RecipientSocial o'chirildi", id };
  }
}
