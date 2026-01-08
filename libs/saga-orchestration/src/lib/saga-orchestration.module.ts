import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SagaInstanceDestination } from '@common/schemas/saga.schema';
import { SagaOrchestrationService } from './saga-orchestration.service';
import { SagaOrchestrationRepository } from './saga-orchestration.repository';

@Module({})
export class SagaOrchestrationModule {
  static forRoot(): DynamicModule {
    return {
      module: SagaOrchestrationModule,
      global: true,
      imports: [MongooseModule.forFeature([SagaInstanceDestination])],
      providers: [SagaOrchestrationService, SagaOrchestrationRepository],
      exports: [SagaOrchestrationService],
    };
  }
}
