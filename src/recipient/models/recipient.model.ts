import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Card } from '../../cards/models/card.model';
import { Shop } from '../../shop/model/shop.model';
import { SocialMedia } from '../../social-media/models/social-media.model';
import { RecipientSocial } from '../../recipient-social/models/recipient-social.model';
import { User } from '../../user/models/user.model';
import { Donate } from '../../donate/models/donate.model';

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

  @HasMany(() => Shop)
  shop: Shop[];

  @BelongsToMany(() => SocialMedia, () => RecipientSocial)
  socialMedia: SocialMedia;

  @BelongsToMany(() => User, () => Donate)
  users: User;

  @HasMany(() => Donate)
  donate: Donate;
}
