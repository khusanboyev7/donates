import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: 'Shop yaratish' })
   @ApiBearerAuth()
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @ApiOperation({ summary: 'Barcha shoplarni olish' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @ApiOperation({ summary: 'Bitta shopni olish' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @ApiOperation({ summary: 'Shopni yangilash' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @ApiOperation({ summary: "Shopni o'chirish" })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
