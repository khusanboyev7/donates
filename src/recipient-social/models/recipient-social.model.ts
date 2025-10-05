import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Recipient } from '../../recipient/models/recipient.model';
import { SocialMedia } from '../../social-media/models/social-media.model';

interface IRecipientSocialCreationAttr {
  recipient_id: number;
  social_id: number;
  social_url: string;
}

@Table({ tableName: 'recipient_socials', timestamps: false })
export class RecipientSocial extends Model<
  RecipientSocial,
  IRecipientSocialCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Recipient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare recipient_id: number;

  @ForeignKey(() => SocialMedia)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare social_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare social_url: string;

  @BelongsTo(() => Recipient)
  recipient: Recipient;

  @BelongsTo(() => SocialMedia)
  socialMedia: SocialMedia;

}
