import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Foydalanuvchining to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Foydalanuvchining emaili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'Foydalanuvchining paroli',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '8600123456789012',
    description: 'Foydalanuvchining karta raqami',
  })
  @IsString()
  @IsOptional()
  card_number?: string;

  @ApiProperty({ example: true, description: 'Foydalanuvchining aktivligi' })
  @IsOptional()
  is_active?: boolean;
}
