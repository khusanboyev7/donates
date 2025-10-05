import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Shop } from '../../shop/model/shop.model';
import { Payment } from '../../payments/models/payment.model';

interface IOrderCreationAttr {
  location: string;
  user_id: number;
  shop_id: number;
  status: string;
  quanity: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, IOrderCreationAttr> {
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
  declare location: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quanity: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ForeignKey(() => Shop)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare shop_id: number;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => Shop)
  shops: Shop;

  @HasMany(() => Payment)
  payments: Payment;
}
