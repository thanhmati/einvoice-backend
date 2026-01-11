import { Injectable, Logger } from '@nestjs/common';
import { SagaOrchestrationRepository } from './saga-orchestration.repository';
import { SagaContext, SagaStep, SagaStepResult } from '@common/interfaces/saga/saga-step.interface';
import { SAGA_STATUS, SAGA_STEP_STATUS, SAGA_TYPE } from '@common/constants/enum/saga.enum';
import { SagaInstance } from '@common/schemas/saga.schema';

@Injectable()
export class SagaOrchestrationService {
  private readonly logger = new Logger(SagaOrchestrationService.name);

  constructor(private readonly repository: SagaOrchestrationRepository) {}

  async execute<TContext extends SagaContext>(
    sagaType: SAGA_TYPE,
    steps: SagaStep<TContext>[],
    context: TContext,
  ): Promise<SagaInstance | null> {
    const stepNames = steps.map((s) => s.name);

    // Create saga instance
    const saga = await this.repository.create(sagaType, context, stepNames);
    this.logger.log(`Saga ${saga._id} created for type ${sagaType}`);
    const sagaId = saga._id.toString();

    // Update context with sagaId
    context.sagaId = sagaId;
    await this.repository.updateContext(sagaId, context);

    // Update status to RUNNING
    await this.repository.updateStatus(sagaId, SAGA_STATUS.RUNNING);

    try {
      // Execute steps sequentially
      for (let i = 0; i < steps.length; i++) {
        await this.repository.updateCurrentStep(sagaId, i);
        await this.executeStep(sagaId, i, steps[i], context);
      }

      // All steps completed successfully
      const completedSaga = await this.repository.updateStatus(sagaId, SAGA_STATUS.COMPLETED);
      this.logger.log(`Saga ${sagaId} completed successfully`);

      return completedSaga;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Saga ${sagaId} failed: ${errorMessage}`, error instanceof Error ? error.stack : '');
      await this.repository.updateStatus(sagaId, SAGA_STATUS.FAILED, errorMessage);

      // Trigger compensation
      await this.compensate(sagaId, steps, context);

      throw error;
    }
  }

  private async executeStep<TContext extends SagaContext>(
    sagaId: string,
    stepIndex: number,
    step: SagaStep<TContext>,
    context: TContext,
  ): Promise<void> {
    this.logger.log(`Executing step ${stepIndex}: ${step.name} for saga ${sagaId}`);

    await this.repository.markStepRunning(sagaId, stepIndex);

    try {
      const result: SagaStepResult = await step.execute(context);

      if (!result.success) {
        throw new Error(result.error || `Step ${step.name} failed`);
      }

      // Update context with step result data
      if (result.data) {
        Object.assign(context, result.data);
        await this.repository.updateContext(sagaId, context);
      }

      await this.repository.markStepCompleted(sagaId, stepIndex, result.data);
      this.logger.log(`Step ${stepIndex}: ${step.name} completed for saga ${sagaId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Step ${stepIndex}: ${step.name} failed for saga ${sagaId}: ${errorMessage}`);
      await this.repository.markStepFailed(sagaId, stepIndex, errorMessage);
      throw error;
    }
  }

  private async compensate<TContext extends SagaContext>(
    sagaId: string,
    steps: SagaStep<TContext>[],
    context: TContext,
  ): Promise<void> {
    this.logger.log(`Starting compensation for saga ${sagaId}`);
    const saga = await this.repository.updateStatus(sagaId, SAGA_STATUS.COMPENSATING);
    if (!saga) {
      this.logger.error(`Saga ${sagaId} not found for compensation`);
      return;
    }

    const completedSteps = saga.steps.filter((s: any) => s.status === SAGA_STEP_STATUS.COMPLETED);

    // Compensate in reverse order
    for (let i = completedSteps.length - 1; i >= 0; i--) {
      const stepName = completedSteps[i].stepName;
      const step = steps.find((s: SagaStep<TContext>) => s.name === stepName);

      if (step && step.compensate) {
        try {
          this.logger.log(`Compensating step: ${step.name} for saga ${sagaId}`);
          const stepIndex = saga.steps.findIndex((s: any) => s.stepName === stepName);

          await this.repository.markStepCompensating(sagaId, stepIndex);

          await step.compensate(context);

          await this.repository.markStepCompensated(sagaId, stepIndex);

          this.logger.log(`Step ${step.name} compensated for saga ${sagaId}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          this.logger.error(`Failed to compensate step ${step.name} for saga ${sagaId}: ${errorMessage}`);
          // Continue with other compensations even if one fails
        }
      }
    }

    await this.repository.updateStatus(sagaId, SAGA_STATUS.COMPENSATED);
    this.logger.log(`Compensation completed for saga ${sagaId}`);
  }
}
