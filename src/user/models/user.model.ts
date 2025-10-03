import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from '../../order/model/order.model';

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  card_number?: string;
  is_active?: boolean;
}

@Table({ tableName: 'users' }) // <-- Dekorator
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  full_name: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare card_number: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @HasMany(() => Order)
  orders: Order[];
}
