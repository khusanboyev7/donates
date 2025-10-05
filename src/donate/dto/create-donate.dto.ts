import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDonateDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 2, description: 'Recipient ID' })
  @IsInt()
  @IsNotEmpty()
  recipient_id: number;

  @ApiProperty({
    example: 'Yordam uchun rahmat!',
    description: 'Donat haqida bildirishnoma',
  })
  @IsString()
  @IsNotEmpty()
  notification: string;

  @ApiProperty({ example: false, description: 'Anonim to‘lovmi yoki yo‘qmi' })
  @IsBoolean()
  @IsNotEmpty()
  is_AnonimPay: boolean;
}
