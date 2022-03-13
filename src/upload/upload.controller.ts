import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  // 单文件上传，使用fs模块读写文件流
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    const writeFile = fs.createWriteStream(
      path.join(__dirname, '../../upload', `${file.originalname}`),
    );
    writeFile.write(file.buffer);
    return {
      code: 200,
    };
  }

  //   多文件上传
  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  uploadFiles(@UploadedFiles() files) {
    const path = '';
    return {
      files: files.map((f) => path + f.originalname),
    };
  }

  @Post('express-file')
  @UseInterceptors(FileInterceptor('file'))
  expressFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file.originalname,
    };
  }

  @Post('express-files')
  @UseInterceptors(FileInterceptor('files'))
  expressFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      files: files.map((f) => f.originalname),
    };
  }
}
