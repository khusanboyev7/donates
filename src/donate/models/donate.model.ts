import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Recipient } from '../../recipient/models/recipient.model';
import { Payment } from '../../payments/models/payment.model';

interface IDonateCreationAttr {
  recipient_id: number;
  user_id: number;
  notification: string;
  is_AnonimPay: boolean;
}
@Table({ tableName: 'donate' })
export class Donate extends Model<Donate, IDonateCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipient_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare notification: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_AnonimPay: boolean;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => Recipient)
  recipient: Recipient;

  @HasMany(() => Payment)
  payments: Payment;

  @BelongsToMany(() => User, () => Payment)
  user: User;
}
