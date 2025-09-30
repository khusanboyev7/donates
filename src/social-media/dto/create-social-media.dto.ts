import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialMediaDto {
  @ApiProperty({ example: 'Facebook', description: 'Social media nomi' })
  @IsString()
  @IsNotEmpty()
  social_media: string;

  @ApiProperty({
    example: 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
    description: 'Ikonka URL manzili',
  })
  @IsString()
  @IsNotEmpty()
  icon_url: string;
}
