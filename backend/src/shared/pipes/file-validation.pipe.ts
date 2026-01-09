import {
  BadRequestException,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';
import { type FileUpload } from 'graphql-upload-ts';
import { validateFileFormat, validateFileSize } from '../utils/file.util';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  public async transform(value: FileUpload): Promise<FileUpload> {
    // Maximum file size in bytes (10 MB)
    const maxFileSizeInBytes = 10 * 1024 * 1024;

    if (!value || !value.filename) {
      throw new BadRequestException('Файл не был загружен');
    }

    // An typescript error, functional is fine, it needs to be solved
    const { filename, createReadStream }: FileUpload = value;

    const allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const isFileFormatValid = validateFileFormat(filename, allowedFormats);

    if (!isFileFormatValid) {
      throw new BadRequestException('Недопустимый формат файла');
    }

    const isFileSizeValid = await validateFileSize(
      createReadStream(),
      maxFileSizeInBytes,
    );

    if (!isFileSizeValid) {
      throw new BadRequestException('Файл слишком большой');
    }

    return value;
  }
}
