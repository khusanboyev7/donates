import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SocialMedia } from './models/social-media.model';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia)
    private readonly socialMediaModel: typeof SocialMedia,
  ) {}

  async create(
    createSocialMediaDto: CreateSocialMediaDto,
  ): Promise<SocialMedia> {
    const { social_media, icon_url } = createSocialMediaDto;

    if (!social_media || !icon_url) {
      throw new BadRequestException('Iltimos barchasini kiriting');
    }

    const existsSocial = await this.socialMediaModel.findOne({
      where: { social_media },
    });
    if (existsSocial) {
      throw new BadRequestException('Bunday social media mavjud');
    }

    return this.socialMediaModel.create(createSocialMediaDto);
  }

  findAll(): Promise<SocialMedia[]> {
    return this.socialMediaModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<SocialMedia> {
    const social = await this.socialMediaModel.findByPk(id, {
      include: { all: true },
    });
    if (!social) {
      throw new NotFoundException('Social media topilmadi');
    }
    return social;
  }

  async update(
    id: number,
    updateSocialMediaDto: UpdateSocialMediaDto,
  ): Promise<SocialMedia> {
    const { social_media, icon_url } = updateSocialMediaDto;

    const social = await this.socialMediaModel.findByPk(id);
    if (!social) {
      throw new NotFoundException('Social media topilmadi');
    }

    if (social_media) {
      const existsSocial = await this.socialMediaModel.findOne({
        where: { social_media },
      });
      if (existsSocial && existsSocial.id !== id) {
        throw new BadRequestException('Bunday social media mavjud');
      }
    }

    const updated = await this.socialMediaModel.update(updateSocialMediaDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number) {
    const deleted = await this.socialMediaModel.destroy({ where: { id } });
    if (!deleted) {
      return { message: 'Bunday social media mavjud emas' };
    }
    return { message: "Social media o'chirildi", id };
  }
}
