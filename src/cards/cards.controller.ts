import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

      @ApiOperation({ summary: "Card yaratish" })
 
  @ApiBearerAuth()
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

      @ApiOperation({ summary: "Barcha cardlarni olish" })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }
      @ApiOperation({ summary: "Bitta cardni olish" })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }
      @ApiOperation({ summary: "Cardni yangilash" })
  @ApiBearerAuth()  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }
      @ApiOperation({ summary: "Cardni o'chirish" })
  @ApiBearerAuth()

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
