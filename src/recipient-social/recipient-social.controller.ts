import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipientSocialService } from './recipient-social.service';
import { CreateRecipientSocialDto } from './dto/create-recipient-social.dto';
import { UpdateRecipientSocialDto } from './dto/update-recipient-social.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiTags('Recipient Social')  
@Controller('recipient-social')
export class RecipientSocialController {
  constructor(private readonly recipientSocialService: RecipientSocialService) {}

  @ApiOperation({ summary: 'Recipient Social' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(createRecipientSocialDto);
  }
  @ApiOperation({ summary: 'Get all Recipient Social' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.recipientSocialService.findAll();
  }
  @ApiOperation({ summary: 'Get Recipient Social by ID' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientSocialService.findOne(+id);
  }
  
  @ApiOperation({ summary: 'Update Recipient Social by ID' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientSocialDto: UpdateRecipientSocialDto) {
    return this.recipientSocialService.update(+id, updateRecipientSocialDto);
  }
  @ApiOperation({ summary: 'Delete Recipient Social by ID' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientSocialService.remove(+id);
  }
}
