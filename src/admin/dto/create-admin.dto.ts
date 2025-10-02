import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsBoolean,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Adminning to‘liq ismi' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'admin@gmail.com', description: 'Adminning emaili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Admin paroli' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: true,
    description: 'Admin tizim yaratuvchisi yoki yo‘qligi',
  })
  @IsBoolean()
  is_creator: boolean;
}
