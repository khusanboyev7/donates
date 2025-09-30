import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Recipient } from './models/recipient.model';
@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient) private recipientModel: typeof Recipient,
  ) {}

  async create(CreateRecipientDto: CreateRecipientDto): Promise<Recipient> {
    const { name, email, address,  full_name, password } = CreateRecipientDto;
    if (!name || !email || !address || !full_name || !password) {
      throw new NotFoundException('Iltimos barchasini kiriting');
    }

    const existsName = await this.recipientModel.findOne({ where: { name } });
    if (existsName) {
      throw new BadRequestException('Bunday nomli recipient mavjud');
    }

    const existsEmail = await this.recipientModel.findOne({ where: { email } });
    if (existsEmail) {
      throw new BadRequestException('Bunday email mavjud');
    }

    const existsAddress = await this.recipientModel.findOne({
      where: { address },
    });
    if (existsAddress) {
      throw new BadRequestException('Bunday address mavjud');
    }

    return this.recipientModel.create(CreateRecipientDto);
  }

  async findAll(): Promise<Recipient[]> {
    return this.recipientModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Recipient | null> {
    const recipient = await this.recipientModel.findByPk(id, {
      include: { all: true },
    });
    if (!recipient) {
      throw new NotFoundException('Companiy not found');
    }

    return recipient;
  }

  async findOneByName(name: string): Promise<Recipient | null> {
    const recipientName = await this.recipientModel.findOne({ where: { name } });
    if (!recipientName) {
      throw new NotFoundException('RecipientName not found');
    }
    return recipientName;
  }

  async update(id: number, UpdateRecipientDto: UpdateRecipientDto): Promise<Recipient> {
    const { name, address, email,  password, full_name } = UpdateRecipientDto;

    const recipientId = await this.recipientModel.findByPk(id);
    if (!recipientId) {
      throw new NotFoundException('recipient not found');
    }

    if (name) {
      const existsName = await this.recipientModel.findOne({ where: { name } });
      if (existsName && existsName.id !== id) {
        throw new BadRequestException('Bu name band ');
      }
    }

    if (address) {
      const existsAddress = await this.recipientModel.findOne({
        where: { address },
      });
      if (existsAddress && existsAddress.id !== id) {
        throw new BadRequestException(
          'Bunday Addres mavjud boshqa adres toping',
        );
      }
    }

    if (email) {
      const existsEmail = await this.recipientModel.findOne({ where: { email } });
      if (existsEmail && existsEmail.id !== id) {
        throw new BadRequestException('Bunday Email mavjud');
      }
    }

    const recipient = await this.recipientModel.update(UpdateRecipientDto, {
      where: { id },
      returning: true,
    });
    return recipient[1][0];
  }

  async remove(id: number) {
    const delCount = await this.recipientModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: 'Bunday recipient mavjud emas' };
    }
    return { message: "Recipient o'chirildi", id };
  }
}
