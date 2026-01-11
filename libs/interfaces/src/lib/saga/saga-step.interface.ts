export interface SagaStepResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface SagaStep<TContext = any> {
  name: string;
  execute: (context: TContext) => Promise<SagaStepResult>;
  compensate?: (context: TContext) => Promise<void>;
}

export interface SagaContext {
  sagaId: string;
  [key: string]: any;
}

export interface SagaStepExecution {
  stepName: string;
  status: string;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  data?: any;
}
