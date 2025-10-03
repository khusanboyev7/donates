import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from './model/shop.model';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop) private shopModel: typeof Shop) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const { title, price, recipient_id, category_id } = createShopDto;

    if (!title || !price || !recipient_id || !category_id) {
      throw new NotFoundException('Iltimos barchasini to‘ldiring');
    }

    const exists = await this.shopModel.findOne({ where: { title } });
    if (exists) {
      throw new BadRequestException('Bunday nomli shop mavjud');
    }

    return this.shopModel.create(createShopDto);
  }

  async findAll(): Promise<Shop[]> {
    return this.shopModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Shop> {
    const shop = await this.shopModel.findByPk(id, { include: { all: true } });
    if (!shop) {
      throw new NotFoundException('Shop topilmadi');
    }
    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    const shop = await this.shopModel.findByPk(id);
    if (!shop) {
      throw new NotFoundException('Shop topilmadi');
    }

    if (updateShopDto.title) {
      const exists = await this.shopModel.findOne({
        where: { title: updateShopDto.title },
      });
      if (exists && exists.id !== id) {
        throw new BadRequestException('Bu nom band');
      }
    }

    const updated = await this.shopModel.update(updateShopDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number) {
    const delCount = await this.shopModel.destroy({ where: { id } });
    if (!delCount) throw new NotFoundException('Shop topilmadi');
    return { message: 'Shop o‘chirildi', id };
  }
}
