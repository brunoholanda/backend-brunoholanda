import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('pdf')
export class PdfController {
  @Get(':fileName')
  getPdf(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'pdfs', fileName);
    res.sendFile(filePath);
  }
}
