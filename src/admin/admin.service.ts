import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { email, full_name } = createAdminDto;

    const existsEmail = await this.adminModel.findOne({ where: { email } });
    if (existsEmail) {
      throw new BadRequestException('Bunday email mavjud');
    }

    return this.adminModel.create(createAdminDto);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin topilmadi');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin topilmadi');
    }

    if (updateAdminDto.email) {
      const existsEmail = await this.adminModel.findOne({
        where: { email: updateAdminDto.email },
      });
      if (existsEmail && existsEmail.id !== id) {
        throw new BadRequestException('Bu email band');
      }
    }

    const updated = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number) {
    const delCount = await this.adminModel.destroy({ where: { id } });
    if (!delCount) {
      throw new NotFoundException('Bunday admin mavjud emas');
    }
    return { message: 'Admin o‘chirildi', id };
  }
}
