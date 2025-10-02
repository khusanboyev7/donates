import { Table, Column, DataType, Model } from 'sequelize-typescript';

interface IAdminCreationAttr {
  full_name: string;
  email: string;
  password: string;
  is_creator?: boolean;
  is_active?: boolean;
  token?: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @Column({
    type: DataType.SMALLINT,
    autoIncrement: true,
    primaryKey: true,
  })
   declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
   declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
   declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
   declare token: string;
}
