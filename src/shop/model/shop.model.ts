import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Recipient } from '../../recipient/models/recipient.model';
import { Category } from '../../category/model/category.model';
import { Order } from '../../order/model/order.model';
import { User } from '../../user/models/user.model';

interface IShopCreationAttr {
  name: string;
  count: number;
  price: string;
  title: string;
  recipient_id: number;
  category_id: number;
  description: string;
}
@Table({ tableName: 'shop' })
export class Shop extends Model<Shop, IShopCreationAttr> {
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
  declare name: string;

    @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare count: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipient_id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare category_id: number;

    @HasMany(() => Order)
    orders: Order[];

    @BelongsToMany(() => User, () => Order)
    users: User
}
