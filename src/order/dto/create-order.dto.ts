import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 'Toshkent, Chilonzor',
    description: 'Buyurtma joylashuv manzili',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID si' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 2, description: 'Shop ID si' })
  @IsInt()
  @IsNotEmpty()
  shop_id: number;

  @ApiProperty({ example: 'pending', description: 'Buyurtma statusi' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 3, description: 'Buyurtma soni (quantity)' })
  @IsInt()
  @IsNotEmpty()
  quanity: number;
}
