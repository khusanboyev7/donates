import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { user_id, shop_id, location, status, quanity } = createOrderDto;

    if (!user_id || !shop_id || !location || !status || !quanity) {
      throw new NotFoundException('Iltimos barchasini to‘ldiring');
    }

    return this.orderModel.create(createOrderDto);
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: { all: true },
    });
    if (!order) throw new NotFoundException('Order topilmadi');
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new NotFoundException('Order topilmadi');

    const updated = await this.orderModel.update(updateOrderDto, {
      where: { id },
      returning: true,
    });

    return updated[1][0];
  }

  async remove(id: number) {
    const delCount = await this.orderModel.destroy({ where: { id } });
    if (!delCount) throw new NotFoundException('Order topilmadi');
    return { message: 'Order o‘chirildi', id };
  }
}
