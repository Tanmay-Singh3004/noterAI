import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './book.service';
import { Public } from 'src/custom.decorator/custom.decorator';
import { AuthGuard } from '@nestjs/passport';
import { BookDto } from './dto/book.dto';
import { SectionDto } from './dto/section.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('new/book')
  @UseGuards(AuthGuard('jwt'))
  addNewBook(@Body() dto: BookDto, @Req() request) {
    return this.userService.addNewBook(request, dto);
  }

  @Post('new/:bookId/section')
  @UseGuards(AuthGuard('jwt'))
  addNewSection(
    @Body() dto: SectionDto,
    @Param('bookId') bookId: string,
    @Req() request,
  ) {
    return this.userService.addNewSection(request, bookId, dto);
  }

  @Get('books')
  @UseGuards(AuthGuard('jwt'))
  getBooks(
    @Req() request,
  ) {
    return this.userService.getBooks(request);
  }

  @Get(':bookId/:sectionId/notes')
  @UseGuards(AuthGuard('jwt'))
  getNotes(
    @Param('bookId') bookId: string,
    @Param('sectionId') sectionId: string,
    @Req() request,
  ) {
    return this.userService.getNotes(request, bookId, sectionId);
  }
}
