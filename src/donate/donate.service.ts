import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Donate } from './models/donate.model';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';

@Injectable()
export class DonateService {
  constructor(@InjectModel(Donate) private donateModel: typeof Donate) {}

  async create(createDonateDto: CreateDonateDto): Promise<Donate> {
    const { user_id, recipient_id, notification, is_AnonimPay } =
      createDonateDto;

    if (!user_id || !recipient_id || !notification) {
      throw new BadRequestException('Barcha maydonlarni to‘ldiring');
    }

    return this.donateModel.create(createDonateDto);
  }

  async findAll(): Promise<Donate[]> {
    return this.donateModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Donate> {
    const donate = await this.donateModel.findByPk(id, {
      include: { all: true },
    });
    if (!donate) throw new NotFoundException('Donate topilmadi');
    return donate;
  }

  async update(id: number, updateDonateDto: UpdateDonateDto): Promise<Donate> {
    const donate = await this.donateModel.findByPk(id);
    if (!donate) throw new NotFoundException('Donate topilmadi');

    const [_, updated] = await this.donateModel.update(updateDonateDto, {
      where: { id },
      returning: true,
    });
    return updated[0];
  }

  async remove(id: number) {
    const delCount = await this.donateModel.destroy({ where: { id } });
    if (!delCount) throw new NotFoundException('Donate topilmadi');
    return { message: 'Donate o‘chirildi', id };
  }
}
