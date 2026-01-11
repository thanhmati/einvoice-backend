import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SagaInstanceDestination } from '@common/schemas/saga.schema';
import { SagaOrchestrationRepository } from './saga-orchestration.repository';
import { SagaOrchestrationService } from './saga-orchestration.service';

@Module({})
export class SagaOrchestrationModule {
  static forRoot() {
    return {
      module: SagaOrchestrationModule,
      global: true,
      imports: [MongooseModule.forFeature([SagaInstanceDestination])],
      providers: [SagaOrchestrationRepository, SagaOrchestrationService],
      exports: [SagaOrchestrationService],
    };
  }
}
