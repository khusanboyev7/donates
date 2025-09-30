import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Recipient } from '../../recipient/models/recipient.model';

interface ICardsCreationAttr {
  card_type: string;
  card_number: string;
  recipient_id: number;
  expiry_date: string;
}

@Table({ tableName: 'cards' })
export class Card extends Model<Card, ICardsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare card_type: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare card_number: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare expiry_date: string;

  @ForeignKey(() => Recipient)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  declare recipient_id: number;

  @BelongsTo(() => Recipient)
  recipient: Recipient;
}
