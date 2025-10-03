import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { full_name, password, email, card_number, is_active } = createUserDto;

    if (!full_name || !password || !is_active || !email || !card_number) {
      throw new BadRequestException('Iltimos barcha maydonlarni kiriting');
    }

    const existsEmail = await this.userModel.findOne({ where: { email } });
    if (existsEmail) {
      throw new BadRequestException('Bunday email mavjud');
    }


    const existsCard = await this.userModel.findOne({ where: { card_number } });
    if (existsCard) {
      throw new BadRequestException('Bunday karta raqami mavjud');
    }

    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException('User topilmadi');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User topilmadi');
    }

    if (updateUserDto.email) {
      const existsEmail = await this.userModel.findOne({
        where: { email: updateUserDto.email },
      });
      if (existsEmail && existsEmail.id !== id) {
        throw new BadRequestException('Bunday email allaqachon band');
      }
    }

    if (updateUserDto.card_number) {
      const existsCard = await this.userModel.findOne({
        where: { card_number: updateUserDto.card_number },
      });
      if (existsCard && existsCard.id !== id) {
        throw new BadRequestException('Bunday karta raqami band');
      }
    }

    const updated = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number) {
    const delCount = await this.userModel.destroy({ where: { id } });
    if (!delCount) {
      throw new NotFoundException('User topilmadi');
    }
    return { message: 'User o‘chirildi', id };
  }
}
