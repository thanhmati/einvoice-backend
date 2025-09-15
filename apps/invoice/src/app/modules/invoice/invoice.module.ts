import { MongoProvider } from '@common/configuration/mongo.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceDestination } from '@common/schemas/invoice.schema';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';

@Module({
  imports: [MongoProvider, MongooseModule.forFeature([InvoiceDestination])],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
