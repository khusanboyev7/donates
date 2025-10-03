import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    if (!name) throw new NotFoundException('Name kiritilishi kerak');

    const exists = await this.categoryModel.findOne({ where: { name } });
    if (exists) throw new BadRequestException('Bunday kategoriya mavjud');

    return this.categoryModel.create(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) throw new NotFoundException('Kategoriya topilmadi');
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Kategoriya topilmadi');

    if (updateCategoryDto.name) {
      const exists = await this.categoryModel.findOne({
        where: { name: updateCategoryDto.name },
      });
      if (exists && exists.id !== id) {
        throw new BadRequestException('Bunday nomli kategoriya mavjud');
      }
    }

    const updated = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number) {
    const delCount = await this.categoryModel.destroy({ where: { id } });
    if (!delCount) throw new NotFoundException('Kategoriya topilmadi');
    return { message: 'Kategoriya o‘chirildi', id };
  }
}
