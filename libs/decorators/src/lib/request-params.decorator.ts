import { EXECUTION_CONTEXT_REQ_INDEX } from '@common/constants/decorators.constant';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestParams = createParamDecorator((param: string, ctx: ExecutionContext) => {
  const req = ctx.getArgByIndex(EXECUTION_CONTEXT_REQ_INDEX);
  if (!param) {
    return req.data;
  }

  return req.data[param];
});
