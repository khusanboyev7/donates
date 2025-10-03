import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDecimal, IsInt } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ example: 'Laptop', description: 'Do‘kon mahsulotining nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'MacBook Pro 16"',
    description: 'Mahsulot sarlavhasi',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1500.5, description: 'Mahsulot narxi' })
  @IsDecimal()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ example: 10, description: 'Mahsulot soni (count)' })
  @IsInt()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ example: 1, description: 'Recipientning ID si' })
  @IsInt()
  @IsNotEmpty()
  recipient_id: number;

  @ApiProperty({ example: 2, description: 'Category ID si' })
  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({
    example: 'Yangi model, 16GB RAM, 512GB SSD',
    description: 'Mahsulot tavsifi',
  })
  @IsString()
  description: string;
}
