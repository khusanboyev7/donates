import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Shop } from '../../shop/model/shop.model';

interface ICategoryCreationAttr {
  name: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryCreationAttr> {
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

  @HasMany(() => Shop)
  shops: Shop[];
}
