export enum SAGA_STATUS {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  COMPENSATING = 'COMPENSATING',
  COMPENSATED = 'COMPENSATED',
}

export enum SAGA_TYPE {
  INVOICE_SEND = 'INVOICE_SEND',
}

export enum SAGA_STEP_STATUS {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  COMPENSATING = 'COMPENSATING',
  COMPENSATED = 'COMPENSATED',
}

export enum SAGA_TOPICS {
  // Step completion events
  SAGA_STEP_COMPLETED = 'saga-step-completed',
  SAGA_STEP_FAILED = 'saga-step-failed',

  // Compensation events
  SAGA_COMPENSATE_FILE_UPLOAD = 'saga-compensate-file-upload',
  SAGA_COMPENSATE_PAYMENT = 'saga-compensate-payment',
  SAGA_COMPENSATION_COMPLETED = 'saga-compensation-completed',
  SAGA_COMPENSATION_FAILED = 'saga-compensation-failed',
}
