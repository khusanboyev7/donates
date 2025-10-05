import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 2, description: 'Donate ID' })
  @IsInt()
  @IsNotEmpty()
  donate_id: number;

  @ApiProperty({ example: 3, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: 'Payme', description: 'To‘lov usuli' })
  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @ApiProperty({ example: 'completed', description: 'To‘lov holati' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: '250000', description: 'To‘lov summasi' })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ example: '2025-10-05', description: 'To‘lov sanasi' })
  @IsDateString()
  @IsNotEmpty()
  payment_date: Date;
}
