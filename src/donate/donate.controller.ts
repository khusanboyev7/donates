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
import { DonateService } from './donate.service';
import { CreateDonateDto } from './dto/create-donate.dto';
import { UpdateDonateDto } from './dto/update-donate.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Donate')
@ApiBearerAuth()
@Controller('donate')
export class DonateController {
  constructor(private readonly donateService: DonateService) {}

  @ApiOperation({ summary: 'Donate yaratish' })
  @Post()
  create(@Body() createDonateDto: CreateDonateDto) {
    return this.donateService.create(createDonateDto);
  }

  @ApiOperation({ summary: 'Barcha donate larni olish' })
  @Get()
  findAll() {
    return this.donateService.findAll();
  }

  @ApiOperation({ summary: 'Bitta donate ni olish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donateService.findOne(+id);
  }

  @ApiOperation({ summary: 'Donate ni yangilash' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonateDto: UpdateDonateDto) {
    return this.donateService.update(+id, updateDonateDto);
  }

  @ApiOperation({ summary: 'Donate ni o‘chirish' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donateService.remove(+id);
  }
}
