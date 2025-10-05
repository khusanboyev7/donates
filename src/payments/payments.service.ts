import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentModel: typeof Payment) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const {
      user_id,
      donate_id,
      order_id,
      payment_method,
      status,
      amount,
      payment_date,
    } = createPaymentDto;

    if (
      !user_id ||
      !donate_id ||
      !order_id ||
      !payment_method ||
      !status ||
      !amount
    ) {
      throw new BadRequestException('Barcha maydonlarni to‘ldiring');
    }

    return this.paymentModel.create(createPaymentDto);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) throw new NotFoundException('Payment topilmadi');
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) throw new NotFoundException('Payment topilmadi');

    const [_, updated] = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
      returning: true,
    });
    return updated[0];
  }

  async remove(id: number) {
    const delCount = await this.paymentModel.destroy({ where: { id } });
    if (!delCount) throw new NotFoundException('Payment topilmadi');
    return { message: 'Payment o‘chirildi', id };
  }
}
