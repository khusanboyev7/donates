import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from "@nestjs/sequelize";
import { Card } from './models/card.model';
import { Recipient } from '../recipient/models/recipient.model';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card) private cardModel: typeof Card,
    @InjectModel(Recipient) private recipientModel: typeof Recipient,
  ) {}

  async create(CreateCardDto: CreateCardDto): Promise<Card> {
    const {card_type,  card_number, recipient_id, expiry_date  } = CreateCardDto;
    if (!card_type || !card_number || !recipient_id || !expiry_date) {
      throw new NotFoundException('Iltimos barchasini kiriting');
    }

    const cardModel = await this.cardModel.findByPk(recipient_id);
    if (!cardModel) {
      throw new NotFoundException('Bunday recipient mavjud emas');
    }

    return this.cardModel.create(CreateCardDto);
  }

  findAll(): Promise<Card[]> {
    return this.cardModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Card | null> {
    const cardId = await this.cardModel.findByPk(id, {
      include: { all: true },
    });
    if (!cardId) {
      throw new NotFoundException('Card not found');
    }

    return cardId;
  }

  async update(id: number, UpdateCardDto: UpdateCardDto): Promise<Card> {
    const { card_number, card_type, expiry_date, recipient_id } = UpdateCardDto;

    const cardId = await this.cardModel.findByPk(id);
    if (!cardId) {
      throw new BadRequestException('Card not found');
    }

    const card = await this.cardModel.update(UpdateCardDto, {
      where: { id },
      returning: true,
    });
    return card[1][0];
  }

  async remove(id: number) {
    const deleted = await this.cardModel.destroy({ where: { id } });
    if (!deleted) {
      return { message: 'Bunday card mavjud emas' };
    }
    return { message: "Card O'chirildi " };
  }
}
