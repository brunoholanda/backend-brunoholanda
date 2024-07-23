import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from '../dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto) {
    const lead = await this.leadsService.create(createLeadDto);
    return {
      statusCode: 201,
      message: 'Lead created successfully',
      data: lead,
    };
  }

  @Get()
  async findAll() {
    const leads = await this.leadsService.findAll();
    return {
      statusCode: 200,
      message: 'Leads retrieved successfully',
      data: leads,
    };
  }
}
