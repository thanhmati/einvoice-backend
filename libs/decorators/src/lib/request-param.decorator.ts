import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestParams = createParamDecorator((param: string, ctx: ExecutionContext) => {
  const request = ctx.switchToRpc().getData();

  if (!param) {
    return request.data.data;
  }

  return request.data.data[param];
});
