import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { Twilio } from 'twilio';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class LeadsService {
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
  ) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials are not set in the environment variables');
    }
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async create(createLeadDto: CreateLeadDto): Promise<{ message: string, lead: Lead }> {
    const lead = this.leadsRepository.create(createLeadDto);
    const savedLead = await this.leadsRepository.save(lead);

    const pdfUrl = 'https://drive.google.com/uc?export=download&id=1tVg8Q3419ERtW7mIXOMmi1FUTd7Yy8I7';
    
    console.log(`Enviando mensagem para: ${savedLead.whatsapp}`);

    await this.sendWhatsAppMessage(savedLead.whatsapp, pdfUrl);

    return {
      message: 'Recebemos seus dados com sucesso, em breve você receberá o seu guia para mudar de profissão!',
      lead: savedLead,
    };
  }

  findAll(): Promise<Lead[]> {
    return this.leadsRepository.find();
  }

  private formatPhoneNumber(phone: string): string {
    // Remover caracteres não numéricos
    let cleaned = phone.replace(/\D/g, '');

    // Verificar o comprimento do número e remover o nono dígito se necessário
    if (cleaned.length === 11 && cleaned.startsWith('9', 2)) {
      cleaned = cleaned.slice(0, 2) + cleaned.slice(3);
    }

    // Adicionar o código do país (Brasil = +55)
    if (cleaned.length === 10) {
      return `+55${cleaned}`;
    } else {
      throw new Error('Invalid phone number length');
    }
  }

  private async sendWhatsAppMessage(to: string, pdfUrl: string) {
    const formattedPhoneNumber = this.formatPhoneNumber(to);
    console.log(`Número de telefone formatado: ${formattedPhoneNumber}`);  // Log do número de telefone formatado
  
    try {
      const message = await this.twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${formattedPhoneNumber}`,
        body: 'Aqui está o seu guia para mudar de profissão!',
        mediaUrl: [pdfUrl], 
      });
      console.log(`Mensagem enviada com sucesso: ${message.sid}`);  // Log do sucesso
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error); 
    }
  }
}
