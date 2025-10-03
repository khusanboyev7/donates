import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RecipientGuard } from '../common/guards/recipient.guard';

@ApiTags('Recipient')
@ApiBearerAuth()
@Controller('recipient')
@UseGuards(JwtAuthGuard, RecipientGuard) 
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @ApiOperation({ summary: 'Recipient yaratish' })
  @Post()
  create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientService.create(createRecipientDto);
  }

  @ApiOperation({ summary: 'Barcha recipientlarni olish' })
  @Get()
  findAll() {
    return this.recipientService.findAll();
  }

  @ApiOperation({ summary: 'Bitta recipientni olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientService.findOne(+id);
  }

  @ApiOperation({ summary: 'Recipientni yangilash' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecipientDto: UpdateRecipientDto,
  ) {
    return this.recipientService.update(+id, updateRecipientDto);
  }

  @ApiOperation({ summary: "Recipientni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipientService.remove(+id);
  }
}
