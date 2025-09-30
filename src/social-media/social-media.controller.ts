import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  

@ApiTags('Social Media')
@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @ApiOperation({ summary: 'Yangi social media yaratish' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }
  @ApiOperation({ summary: 'Barcha social media larni olish' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.socialMediaService.findAll();
  }
  @ApiOperation({ summary: 'ID boyicha social media olish' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialMediaService.findOne(+id);
  }
  @ApiOperation({ summary: 'ID boyicha social media ni yangilash' })
  @ApiBearerAuth()

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }
  @ApiOperation({ summary: 'ID boyicha social media ni ochirish' })
  @ApiBearerAuth()

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialMediaService.remove(+id);
  }
}
