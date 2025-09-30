import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecipientSocialDto {
  @ApiProperty({ example: 1, description: 'Recipient ID' })
  @IsNumber()
  @IsNotEmpty()
  recipient_id: number;


  @ApiProperty({ example: 1, description: 'Social  ID' })
  @IsNumber()
  @IsNotEmpty()
  social_id: number;

  
  @ApiProperty({
    example: 'https://facebook.com/username',
    description: 'Social URL',
  })
  @IsString()
  @IsNotEmpty()
  social_url: string;
}
