import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Recipient')
@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

      @ApiOperation({ summary: "Recipient yaratish" })
  @ApiBearerAuth()
  @Post()
  create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientService.create(createRecipientDto);
  }

 @ApiOperation({ summary: "Barcha recipientlarni olish" }) 
 @ApiBearerAuth()
  @Get()
  findAll() {
    return this.recipientService.findAll();
  }

      @ApiOperation({ summary: "Bitta recipientni olish" })
@ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientService.findOne(+id);
  }

      @ApiOperation({ summary: "Recipientni yangilash" }) 
      @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipientDto: UpdateRecipientDto,
  ) {
    return this.recipientService.update(+id, updateRecipientDto);
  }

      @ApiOperation({ summary: "Recipientni o'chirish" })
@ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientService.remove(+id);
  }
}
