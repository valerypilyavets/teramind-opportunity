import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { LoggedInGuard } from '../logged-in.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { UsersService } from '../users/users.service';
import { File } from './files.interfaces';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService, private usersService: UsersService) {
  }

  @UseGuards(LoggedInGuard)
  @Get()
  getFilesList(@Request() req) {
    return this.filesService.getFiles(req.user.id);
  }

  @UseGuards(LoggedInGuard)
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads/',
  }))
  @Post()
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5000000 }),
      ],
    }),
  ) file: Express.Multer.File, @Request() req): File {
    return this.filesService.createFile(file, req.user.id);
  }


}