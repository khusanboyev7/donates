import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Kategoriya nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
