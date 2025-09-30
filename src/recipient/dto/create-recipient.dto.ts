import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateRecipientDto {
  @ApiProperty({ example: 'John', description: 'Recipientning ismi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'John Doe', description: 'Recipientning toliq ismi' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'JohnDoe123!', description: 'Recipientning paroli' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'JohnDoe123@gmail.com',
    description: 'Recipientning emaili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'USA', description: 'Recipientning addressi' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
