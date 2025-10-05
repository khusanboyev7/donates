import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { Donate } from '../../donate/models/donate.model';
import { Order } from '../../order/model/order.model';

interface IPaymentCreationAttr {
  user_id: number;
  donate_id: number;
  order_id: number;
  payment_method: string;
  status: string;
  amount: string;
  payment_date: Date;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @ForeignKey(() => Donate)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare donate_id: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare payment_method: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare amount: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare payment_date: Date;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => Donate)
  donate: Donate;

  @BelongsTo(() => Order)
  orders: Order;
}
