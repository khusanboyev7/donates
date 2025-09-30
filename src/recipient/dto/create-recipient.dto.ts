import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipientDto {
  @ApiProperty({ example: 'JohnDoe', description: 'Recipientning ismi' })
  name: string;
  @ApiProperty({ example: 'John Doe', description: 'Recipientning toliq ismi' })
  full_name: string;
  @ApiProperty({ example: 'JohnDoe123', description: 'Recipientning paroli' })
  password: string;
  @ApiProperty({ example: 'JohnDoe123@gmail.com', description: 'Recipientning emaili' })
  email: string;
  @ApiProperty({ example: 'USA', description: 'Recipientning addressi' })
  address: string;
}
