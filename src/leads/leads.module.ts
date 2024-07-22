import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PdfController } from '../PdfController/pdf.controller';
import { Lead } from './lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadsService],
  controllers: [LeadsController, PdfController],
})
export class LeadsModule {}
