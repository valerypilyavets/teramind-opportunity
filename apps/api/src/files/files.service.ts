import { BadRequestException, Injectable } from '@nestjs/common';
import { File } from './files.interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class FilesService {
  constructor(private usersService: UsersService) {
  }

  private files: File[] = [];

  getFiles(userId: number): File[] {
    const user = this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('This user do not exist in database');
    }

    return this.files.filter(file => file.userId === userId);
  }

  createFile(file: Express.Multer.File, userId: number): File {
    const user = this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('This user do not exist in database');
    }

    const length = this.files.push({
      ...file,
      id: this.files.length + 1,
      userId: user.id,
    });

    return this.files[length - 1];
  }
}