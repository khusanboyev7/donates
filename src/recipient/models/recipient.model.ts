
import { AutoIncrement, Column, PrimaryKey, Table, Model, DataType, HasMany } from "sequelize-typescript";
import { Card } from "../../cards/models/card.model";

interface IRecipientCreationAttr {
  name: string;
  full_name: string;
  email: string;
  password: string;
  address: string;
}

@Table({ tableName: 'recipients' })
export class Recipient extends Model<Recipient, IRecipientCreationAttr> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  full_name: string;

    @Column({ type: DataType.STRING(50), allowNull: false, unique: true })  
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address: string;

    @HasMany(() => Card)
    cards: Card[];
}
