// src/dto/create-lead.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  whatsapp: string;
}
