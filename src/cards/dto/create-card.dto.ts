import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ example: 'Visa', description: 'Cardning turi' })
  @IsString()
  @IsNotEmpty()
  card_type: string;

  @ApiProperty({ example: '4111111111111111', description: 'Karta raqami' })
  @IsNotEmpty()
  card_number: string; 

  @ApiProperty({ example: 1, description: 'Recipient ID' })
  @IsNumber()
  @IsNotEmpty()
  recipient_id: number;

  @ApiProperty({ example: '12/26', description: 'Amal qilish muddati' })
  @IsString()
  @IsNotEmpty()
  expiry_date: string;
}
