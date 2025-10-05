import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { RecipientSocial } from '../../recipient-social/models/recipient-social.model';
import { Recipient } from '../../recipient/models/recipient.model';

interface ISocialMeidaCreationAttr {
  social_media: string;
  icon_url: string;
}
@Table({ tableName: 'social_media', timestamps: false })
export class SocialMedia extends Model<SocialMedia, ISocialMeidaCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare social_media: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare icon_url: string;

  @HasMany(() => RecipientSocial)
  recipientSocial: RecipientSocial[];

  @BelongsToMany(() => Recipient, () => RecipientSocial)
  recipient: Recipient;
}
